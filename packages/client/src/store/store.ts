import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
import { authAPI } from '@/shared/services/AuthService'
import { leaderboardAPI } from '@/shared/services/LeaderboardService'
import { forumAPI } from '@/shared/services/ForumService'

export const createStore = (initialState = {}) => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'producton',
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(authAPI.middleware)
        .concat(leaderboardAPI.middleware)
        .concat(forumAPI.middleware),
  })
}
export const storeInstance = createStore()

export type RootState = ReturnType<typeof storeInstance.getState>
export type AppDispatch = typeof storeInstance.dispatch

// import { persistStore } from 'redux-persist'
// export const persistor = persistStore(storeInstance)

// {
//   serializableCheck: {
//     // fix for serializableCheck error after base setup redux-persis
//     // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
//     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//   },
// }
