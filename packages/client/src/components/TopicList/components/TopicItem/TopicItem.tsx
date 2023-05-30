import { Button, List, message, Skeleton, Typography } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import {
  IForumItem,
  useDeleteTopicMutation,
  useUpdateTopicMutation,
} from '@/shared/services/ForumService'
import { convertDateTime } from '@/shared/utils/dateTime'
import { useAppSelector } from '@/app'
import { selectUserData } from '@/features/User'
import { useForum } from '@/shared/hooks'
import { ForumModal } from '@/components/ForumModal'
import { IModalData } from '@/components/ForumModal/ForumModal'

import styles from './TopicItem.module.css'

interface IProps {
  topic: IForumItem
}

export const TopicItem: FC<IProps> = ({ topic }) => {
  const { id: userId } = useAppSelector(selectUserData)

  const isCurrentUser = userId === topic.userId
  const [date, time] = convertDateTime(topic.createdAt)

  const [messageApi, contextHolder] = message.useMessage()

  const [deleteTopic, mutationResultDelete] = useDeleteTopicMutation()
  const [updateTopic, mutationResultUpdate] = useUpdateTopicMutation()

  const [isModalOpened, setIsModalOpened] = useState(false)

  const { isLoading, refreshTopics } = useForum()

  const handleDelete = () => {
    deleteTopic({ id: topic.id })
  }

  const handleUpdate = (data: IModalData) => {
    const { title, description } = data

    updateTopic({
      id: topic.id,
      title,
      description,
    })

    setIsModalOpened(false)
  }

  useEffect(() => {
    if (mutationResultDelete.status === 'fulfilled') {
      const title = mutationResultDelete.data.data.title

      messageApi.open({
        type: 'success',
        content: `Тема ${title} успешно удалена`,
      })

      refreshTopics()
    }

    if (mutationResultDelete.status === 'rejected') {
      messageApi.open({
        type: 'error',
        content: `Ошибка при удалении темы`,
      })
    }
  }, [mutationResultDelete])

  useEffect(() => {
    if (mutationResultUpdate.status === 'fulfilled') {
      const title = mutationResultUpdate.data.data.title

      messageApi.open({
        type: 'success',
        content: `Тема ${title} успешно обновлена`,
      })

      refreshTopics()
    }

    if (mutationResultUpdate.status === 'rejected') {
      messageApi.open({
        type: 'error',
        content: `Ошибка при обновлении темы`,
      })
    }
  }, [mutationResultUpdate])

  return (
    <List.Item>
      <Skeleton title={false} loading={isLoading} active>
        <List.Item.Meta
          title={
            <Link to={`/forum/topic/${topic.id}`}>
              <Typography.Title level={4}>{topic.title}</Typography.Title>
            </Link>
          }
          description={<Typography.Text>{topic.description}</Typography.Text>}
        />

        <Typography.Text strong className={styles.counter}>
          {topic.messageCount}
        </Typography.Text>

        <Typography.Text className={styles.date}>{time}</Typography.Text>

        <Typography.Text type="secondary" className={styles.date}>
          {date}
        </Typography.Text>

        <div
          className={classNames(styles.controls, {
            [styles.hidden]: !isCurrentUser,
          })}>
          <Button
            type="default"
            size="small"
            onClick={() => setIsModalOpened(true)}>
            <EditOutlined />
          </Button>

          <Button type="primary" danger size="small" onClick={handleDelete}>
            <DeleteOutlined />
          </Button>
        </div>
      </Skeleton>

      <ForumModal
        isOpened={isModalOpened}
        isLoading={isLoading}
        title={`Тема "${topic.title}"`}
        initialData={{ title: topic.title, description: topic.description }}
        onSubmit={handleUpdate}
        onCancel={() => setIsModalOpened(false)}
      />

      {contextHolder}
    </List.Item>
  )
}
