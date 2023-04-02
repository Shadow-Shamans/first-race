import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IGame {
  isRunning: boolean
  score: number
  coins: number
  time: number
}

const initialState: IGame = {
  isRunning: false,
  score: 923,
  coins: 23,
  time: 132,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload
    },
    decrementTime: state => {
      const { time } = state

      if (time === 0) {
        state.time = 0
      } else {
        state.time -= 1
      }
    },
  },
})

export const { decrementTime, setRunning } = gameSlice.actions
