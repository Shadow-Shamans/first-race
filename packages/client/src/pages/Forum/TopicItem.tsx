import { List, Skeleton, Avatar, Badge } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './Forum.module.css'
import { IForumItem } from './types'

interface IProps {
  item: IForumItem
  isLoading: boolean
}

const TopicItem: FC<IProps> = ({ item, isLoading }) => (
  <List.Item className={styles.listItem}>
    <Skeleton avatar title={false} loading={isLoading} active>
      <List.Item.Meta
        avatar={<Avatar shape="circle" size="default" src={item.userAvatar} />}
        title={
          <Link to={`forum/topic${item.id}`} className={styles.title}>
            {item.title}
          </Link>
        }
        description={
          <div className={styles.lastMessage}>{item.lastMessage}</div>
        }
      />
      <Badge
        className={styles.badge}
        text={<span className={styles.badgeText}>{item.topic}</span>}
        color={item.badgeColor}
        size="small"
        dot={false}
      />
      <div className={styles.totalMessages}>{item.totalMessages}</div>
    </Skeleton>
  </List.Item>
)

export default TopicItem
