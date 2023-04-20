import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThemeNames } from '@/app'

export interface IUser {
  id: number | null
  first_name: string
  second_name: string
  theme: ThemeNames
  avatar: string | null
  email: string
  login: string
  phone: string
}

const initialState: IUser = {
  id: null,
  first_name: '',
  avatar: null,
  second_name: '',
  email: '',
  login: '',
  phone: '',
  theme: 'light',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeNames>) => {
      state.theme = action.payload
    },
    setUserData: (state, action: PayloadAction<IUser>) => {
      state.id = action.payload.id
      state.first_name = action.payload.first_name
      state.avatar = action.payload.avatar
      state.second_name = action.payload.second_name
      state.email = action.payload.email
      state.login = action.payload.login
      state.phone = action.payload.phone
    },
  },
})

export const { setTheme, setUserData } = userSlice.actions
