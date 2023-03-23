import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from '../features/User'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { testDataApi } from '../App/api'
// learn: example how to configure session storage persist
// import sessionStorage from 'redux-persist/lib/storage/session'

const storageKey = 'first_rase_game'

const rootPersistConfig = {
  key: storageKey,
  storage,
  whitelist: [userSlice.name],
}

// learn: example how to configure session storage persist
// const sessionStoragePersistConfig = {
//   key: storageKey,
//   storage: sessionStorage,
// }

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [testDataApi.reducerPath]: testDataApi.reducer,
  // learn: example how to configure session storage persist
  // [authSlice.name]: persistReducer(
  //   sessionStoragePersistConfig,
  //   authSlice.reducer
  // ),
})

export const reducer = persistReducer(rootPersistConfig, rootReducer)
