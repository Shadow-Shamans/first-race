import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThemeNames } from '../../App'

import { RootState } from '../../store'

interface User {
  id: string | null
  name: string
  theme: ThemeNames
}

const initialState: User = {
  id: null,
  name: 'no name',
  theme: 'light',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeNames>) => {
      state.theme = action.payload
    },
  },
})

export const { setTheme } = userSlice.actions

export const isDarkMode = ({ user }: RootState) => user.theme === 'dark'
export const selectUserName = ({ user }: RootState) => user.name
export const selectUserId = ({ user }: RootState) => user.id
