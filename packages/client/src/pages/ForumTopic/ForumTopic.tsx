import React, { FC, useEffect, useState } from 'react'
import { Button, Layout, message, Typography } from 'antd'
import { ForumMessages } from '@/components/ForumMessages'
import { useAppSelector } from '@/app'
import { selectTopic } from '@/features/Forum'
import { convertDateTime } from '@/shared/utils/dateTime'
import { selectUserData } from '@/features/User'
import classNames from 'classnames'
import { EditOutlined } from '@ant-design/icons'
import { useTopic } from '@/shared/hooks/useTopic'
import { ForumModal } from '@/components/ForumModal'
import { IModalData } from '@/components/ForumModal/ForumModal'
import { useUpdateTopicMutation } from '@/shared/services/ForumService'

import styles from './ForumTopic.module.css'

export const ForumTopic: FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const { isLoading, refreshTopic } = useTopic()

  const { id: userId } = useAppSelector(selectUserData)
  const {
    title,
    description,
    createdAt,
    messageCount,
    userId: topicUserId,
    id: topicId,
  } = useAppSelector(selectTopic)

  const isCurrentUser = userId === topicUserId
  const [date, time] = convertDateTime(createdAt)

  const [isModalOpened, setIsModalOpened] = useState(false)

  const [updateTopic, mutationResultUpdate] = useUpdateTopicMutation()

  const handleUpdate = (data: IModalData) => {
    const { title, description } = data

    updateTopic({
      id: topicId,
      title,
      description,
    })

    setIsModalOpened(false)
  }

  useEffect(() => {
    if (mutationResultUpdate.status === 'fulfilled') {
      const title = mutationResultUpdate.data.data.title

      messageApi.open({
        type: 'success',
        content: `Тема ${title} успешно обновлена`,
      })

      refreshTopic()
    }

    if (mutationResultUpdate.status === 'rejected') {
      messageApi.open({
        type: 'error',
        content: `Ошибка при обновлении темы`,
      })
    }
  }, [mutationResultUpdate])

  return (
    <Layout className={`${styles.layout}`}>
      <Layout.Header className={styles.header}>
        <div className={styles.titleWrapper}>
          <Typography.Title level={3}>{title}</Typography.Title>

          <div className={styles.meta}>
            <Typography.Text strong className={styles.counter}>
              {messageCount}
            </Typography.Text>

            <Typography.Text className={styles.date}>{time}</Typography.Text>

            <Typography.Text type="secondary" className={styles.date}>
              {date}
            </Typography.Text>
          </div>

          <div
            className={classNames(styles.controls, {
              [styles.hidden]: !isCurrentUser,
            })}>
            <Button
              type="default"
              size="small"
              onClick={() => setIsModalOpened(true)}>
              <EditOutlined rev={undefined} />
            </Button>
          </div>
        </div>

        <Typography.Text>{description}</Typography.Text>
      </Layout.Header>

      <Layout.Content>
        {!isLoading && <ForumMessages parentId={topicId} />}
      </Layout.Content>

      {isModalOpened && (
        <ForumModal
          isLoading={isLoading}
          title={`Тема "${title}"`}
          initialData={{ title, description }}
          onSubmit={handleUpdate}
          onCancel={() => setIsModalOpened(false)}
        />
      )}

      {contextHolder}
    </Layout>
  )
}
