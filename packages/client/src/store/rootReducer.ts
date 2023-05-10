import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { userSlice } from '@/features/User'
import { testDataApi } from '@/app/api'
import { authSlice } from '@/features/Auth/authSlice'
import { gameSlice } from '@/features/Game'
import { authAPI } from '@/shared/services/AuthService'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: unknown) {
      return Promise.resolve(value)
    },
    removeItem() {
      return Promise.resolve()
    },
  }
}

const storage =
  typeof window === 'undefined'
    ? createNoopStorage()
    : createWebStorage('local')
const storageKey = 'first_rase_game'

const rootPersistConfig = {
  key: storageKey,
  storage,
  whitelist: [userSlice.name, authSlice.name, gameSlice.name],
}

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [testDataApi.reducerPath]: testDataApi.reducer,
  [gameSlice.name]: gameSlice.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
})

export const reducer = persistReducer(rootPersistConfig, rootReducer)
