import React, { FC } from 'react'
import { Button, Layout, Typography } from 'antd'
import { ForumMessages } from '@/components/ForumMessages'
import { useAppSelector } from '@/app'
import { selectTopic } from '@/features/Forum'
import { convertDateTime } from '@/shared/utils/dateTime'
import { selectUserData } from '@/features/User'
import classNames from 'classnames'
import { EditOutlined } from '@ant-design/icons'
import { useTopic } from '@/shared/hooks/useTopic'

import styles from './ForumTopic.module.css'

export const ForumTopic: FC = () => {
  const { isLoading } = useTopic()

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
              // onClick={() => setIsModalOpened(true)}
            >
              <EditOutlined />
            </Button>
          </div>
        </div>

        <Typography.Text>{description}</Typography.Text>
      </Layout.Header>

      <Layout.Content>
        {!isLoading && <ForumMessages parentId={topicId} />}
      </Layout.Content>
    </Layout>
  )
}
