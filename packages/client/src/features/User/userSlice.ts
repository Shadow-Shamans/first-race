import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThemeNames } from '@/app'

interface IUser {
  id: string | null
  name: string
  theme: ThemeNames
}

const initialState: IUser = {
  id: null,
  name: 'no name',
  theme: 'light',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTheme: (state, action:            PayloadAction<ThemeNames>) => {
      state.theme =            action.payload
    },
  },
})

export const { setTheme } = userSlice.actions
