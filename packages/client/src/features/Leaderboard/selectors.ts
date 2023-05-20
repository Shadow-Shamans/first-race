import { RootState } from '@/store'

export const selectUserList = ({ leaderboard }: RootState) =>
  leaderboard.userList
