import { FC } from 'react'
import { Typography, Avatar } from 'antd'
import { IScoreData } from '@/shared/services/LeaderboardService'

import styles from './Rating.module.css'

export interface IRatingList extends IScoreData {
  rating: number
}

interface IProps {
  currentUserId?: number | null
  list: IRatingList[]
}

const { Text } = Typography

export const Rating: FC<IProps> = ({ currentUserId, list }) => {
  return (
    <ul className={styles.list}>
      {list.map(({ userId, rating, username, score }, index) => (
        <li
          key={userId + index}
          className={styles.item}
          data-is-current-user={userId === currentUserId}>
          <Text strong>{rating}</Text>

          <Avatar>{username[0]}</Avatar>

          <Text strong>{username}</Text>

          <Text strong className={styles.score}>
            {score}
          </Text>
        </li>
      ))}
    </ul>
  )
}
