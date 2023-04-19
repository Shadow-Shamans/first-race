import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IAuth {
  isLoggedIn: boolean
}

// TODO при ините делать запрос user чтобы проверять залогинен ли юзер
const initialState: IAuth = {
  isLoggedIn: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toogleAuth: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
  },
})

export const { toogleAuth } = authSlice.actions
