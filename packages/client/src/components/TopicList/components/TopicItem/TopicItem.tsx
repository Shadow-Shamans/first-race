import { List, Skeleton, Typography } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IForumItem } from '@/shared/services/ForumService'
import { convertDateTime } from '@/shared/utils/dateTime'

import styles from './TopicItem.module.css'

interface IProps {
  topic: IForumItem
  isLoading?: boolean
}

export const TopicItem: FC<IProps> = ({ topic, isLoading = false }) => {
  const [date, time] = convertDateTime(topic.createdAt)

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
      </Skeleton>
    </List.Item>
  )
}
