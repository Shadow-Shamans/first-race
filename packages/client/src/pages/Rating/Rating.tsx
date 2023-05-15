import { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { Rating as RatingItems } from '@/components/Rating'
import { useGetLeaderboardMutation } from '@/shared/services/LeaderboardService'
import { useAppDispatch, useAppSelector } from '@/app'
import { selectUserList, setUserList } from '@/features/Leaderboard'
import { selectUserData } from '@/features/User'

import styles from './rating.module.css'

const pageSize = 10
const limit = 20

export const Rating: FC = () => {
  const userList = useAppSelector(selectUserList)
  const { id: userId } = useAppSelector(selectUserData)
  const appDispatch = useAppDispatch()

  const [getLeaderboard, mutationResult] = useGetLeaderboardMutation()

  const [cursor, setCursor] = useState(0)

  useEffect(() => {
    getLeaderboard({ ratingFieldName: 'score', cursor, limit })
  }, [])

  useEffect(() => {
    if (mutationResult.status === 'fulfilled') {
      try {
        const userListData = mutationResult.data.map(user => user.data)
        const userListToStore = userListData.map((user, index) => ({
          ...user,
          rating: index + 1,
        }))

        appDispatch(setUserList(userListToStore))

        setCursor(cursor + userList.length)
      } catch (error) {
        console.error(error)
      }
    }
  }, [mutationResult])

  const handlePaginationChange = () => {
    getLeaderboard({ ratingFieldName: 'score', cursor, limit })
  }

  return (
    <section className={styles.wrapper}>
      <RatingItems currentUserId={userId} list={userList} />

      {userList.length >= pageSize && (
        <Pagination
          defaultCurrent={1}
          total={userList.length}
          pageSize={pageSize}
          onChange={handlePaginationChange}
        />
      )}
    </section>
  )
}
