import { List, Skeleton, Typography } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IForumItem } from '@/pages/Forum/types'

import styles from './TopicItem.module.css'

interface IProps {
  item: IForumItem
  isLoading?: boolean
}

export const TopicItem: FC<IProps> = ({ item, isLoading = false }) => (
  <List.Item>
    <Skeleton title={false} loading={isLoading} active>
      <List.Item.Meta
        title={
          <Link to={`/forum/topic/${item.id}`}>
            <Typography.Title level={4}>{item.title}</Typography.Title>
          </Link>
        }
      />

      <Typography.Text strong>{item.messageCount}</Typography.Text>

      <Typography.Text type="secondary" className={styles.date}>
        {item.createdDate}
      </Typography.Text>
    </Skeleton>
  </List.Item>
)
