import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IAuth {
  isLoggedIn: boolean
  code: string
}

// TODO при ините делать запрос user чтобы проверять залогинен ли юзер
const initialState: IAuth = {
  isLoggedIn: false,
  code: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toogleAuth: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    toggleCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload
    },
  },
})

export const { toogleAuth, toggleCode } = authSlice.actions
