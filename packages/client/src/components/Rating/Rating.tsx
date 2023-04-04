import { FC } from 'react'
import { Typography, Avatar } from 'antd'

import styles from './Rating.module.css'

export type TRatingList = {
  rating: number
  name: string
  score: string
}

interface IProps {
  list: TRatingList[]
}

const { Text } = Typography

export const Rating: FC<IProps> = ({ list }) => {
  return (
    <ul>
      {list.map(({ rating, name, score }) => (
        <li key={rating} className={styles.item}>
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
