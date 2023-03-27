import { createSlice } from "@reduxjs/toolkit"

interface IAuth {
  isLoggedIn: boolean;
}

// TODO при ините делать запрос user чтобы проверять залогинен ли юзер
const initialState: IAuth = {
  isLoggedIn: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toogle: (state) => {
      state.isLoggedIn = !state.isLoggedIn
    },
  },
})
