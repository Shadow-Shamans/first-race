import { List, Skeleton, Avatar, Badge, Typography } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IProps } from './types'
import styles from './ForumTopicItem.module.css'

export const ForumTopicItem: FC<IProps> = ({ item, isLoading }) => (
  <List.Item className={styles.listItem}>
    <Skeleton avatar title={false} loading={isLoading} active>
      <List.Item.Meta
        avatar={<Avatar shape="circle" size="default" src={item.userAvatar} />}
        title={
          <Link to={`/forum/topic/${item.id}`} className={styles.title}>
            {item.title}
          </Link>
        }
        description={
          <Typography className={styles.lastMessage}>
            {item.lastMessage}
          </Typography>
        }
      />
      <Badge
        className={styles.badge}
        text={<span className={styles.badgeText}>{item.topic}</span>}
        color={item.badgeColor}
        size="small"
        dot={false}
      />
      <Typography className={styles.totalMessages}>
        {item.totalMessages}
      </Typography>
    </Skeleton>
  </List.Item>
)
