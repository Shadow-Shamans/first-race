import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './rootReducer'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { testDataApi } from '../app/api'

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'producton',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // fix for serializableCheck error after base setup redux-persis
        // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(testDataApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
