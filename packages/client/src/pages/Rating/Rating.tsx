import { FC } from 'react'
import { Card, Pagination } from 'antd'
import { Rating as RatingItems } from '@/components/Rating'
import { useGetLeaderboardMutation } from '@/shared/services/LeaderboardService'
import { useAppSelector } from '@/app'
import { selectUserData } from '@/features/User'
import { useRating } from '@/shared/hooks/useRating'

import styles from './rating.module.css'

const pageSize = 10
const limit = 20

export const Rating: FC = () => {
  const { id: userId } = useAppSelector(selectUserData)

  const [getLeaderboard, mutationResult] = useGetLeaderboardMutation()

  const { cursor, userList } = useRating()

  const handlePaginationChange = () => {
    getLeaderboard({ ratingFieldName: 'score', cursor, limit })
  }

  return (
    <Card className={styles.wrapper}>
      <RatingItems currentUserId={userId} list={userList} />

      {userList.length >= pageSize && (
        <Pagination
          defaultCurrent={1}
          total={userList.length}
          pageSize={pageSize}
          onChange={handlePaginationChange}
        />
      )}
    </Card>
  )
}
