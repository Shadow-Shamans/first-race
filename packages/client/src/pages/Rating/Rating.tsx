import { FC } from 'react'
import { FloatButton } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Rating as RatingItems } from '@/components/Rating'

import styles from './rating.module.css'

import { leaderBoardMock } from '@/mocks/ratingMock'

export const Rating: FC = () => {
  return (
    <section className={styles.wrapper}>
      <RatingItems currentUserId={1} list={leaderBoardMock} />
      <FloatButton
        onClick={() => console.log('Search')}
        icon={<SearchOutlined />}
      />
    </section>
  )
}
