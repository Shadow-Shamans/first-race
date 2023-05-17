import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IRatingList } from '@/components/Rating/Rating'

interface ILeaderboard {
  userList: IRatingList[]
}

const initialState: ILeaderboard = {
  userList: [],
}

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setUserList: (state, action: PayloadAction<IRatingList[]>) => {
      state.userList = action.payload
    },
  },
})

export const { setUserList } = leaderboardSlice.actions
