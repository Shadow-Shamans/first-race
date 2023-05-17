import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app'
import { selectUserList, setUserList } from '@/features/Leaderboard'
import {
  ILeaderboardResponse,
  useGetLeaderboardMutation,
} from '../services/LeaderboardService'

const limit = 20

export const useRating = () => {
  const appDispatch = useAppDispatch()

  const userList = useAppSelector(selectUserList)

  const [getLeaderboard, mutationResult] = useGetLeaderboardMutation()

  const [cursor, setCursor] = useState(0)

  useEffect(() => {
    getLeaderboard({ ratingFieldName: 'score', cursor, limit })
  }, [])

  useEffect(() => {
    if (mutationResult.status === 'fulfilled') {
      setRating(mutationResult.data)
    }
  }, [mutationResult])

  const setRating = (data: ILeaderboardResponse[]) => {
    try {
      const preparedUserList = data.map(user => user.data)
      const userListData = preparedUserList.map((user, index) => ({
        ...user,
        rating: index + 1,
      }))

      appDispatch(setUserList(userListData))

      setCursor(cursor + userList.length)
    } catch (error) {
      console.error(error)
    }
  }

  return { userList, cursor }
}
