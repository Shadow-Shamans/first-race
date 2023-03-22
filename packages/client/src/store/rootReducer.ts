import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from '../features/User'

export const reducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
})
