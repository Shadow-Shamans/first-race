import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { userSlice } from '@/features/User'
import { testDataApi } from '@/app/api'
// todo: learn: example how to configure session storage persist
// todo: import sessionStorage from 'redux-persist/lib/storage/session'

const storageKey = 'first_rase_game'

const rootPersistConfig = {
  key: storageKey,
  storage,
  whitelist: [userSlice.name],
}

// todo: learn: example how to configure session storage persist
// const sessionStoragePersistConfig = {
//   key: storageKey,
//   storage: sessionStorage,
// }

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [testDataApi.reducerPath]: testDataApi.reducer,
  // todo: learn: example how to configure session storage persist
  // [authSlice.name]: persistReducer(
  //   sessionStoragePersistConfig,
  //   authSlice.reducer
  // ),
})

export const reducer = persistReducer(rootPersistConfig, rootReducer)
