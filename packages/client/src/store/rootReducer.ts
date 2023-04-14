import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { userSlice } from '@/features/User'
import { testDataApi } from '@/app/api'
import { authSlice } from '@/features/Auth/authSlice'
import { gameSlice } from '@/features/Game'

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
})

export const reducer = persistReducer(rootPersistConfig, rootReducer)
