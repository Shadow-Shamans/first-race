import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './rootReducer'

export const store = configureStore({
  reducer,
  devTools: import.meta.env.MODE !== 'producton',
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
