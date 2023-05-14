import { FC } from 'react'
import { Typography, Avatar } from 'antd'
import { leaderBoardMock } from '@/mocks/ratingMock'

import styles from './Rating.module.css'

export type TRatingList = {
  id: number
  rating: number
  name: string
  score: string
}

interface IProps {
  currentUserId?: number
  list: TRatingList[]
}

const { Text } = Typography

export const RatingPage = () => {
  return <Rating list={leaderBoardMock} />
}

export const Rating: FC<IProps> = ({ currentUserId, list }) => {
  return (
    <ul>
      {list.map(({ id, rating, name, score }) => (
        <li
          key={id}
          className={styles.item}
          data-is-current-user={id === currentUserId}>
          <Text strong>{rating}</Text>

          <Avatar>{name[0]}</Avatar>

          <Text strong>{name}</Text>

          <Text strong className={styles.score}>
            {score}
          </Text>
        </li>
      ))}
    </ul>
  )
}
