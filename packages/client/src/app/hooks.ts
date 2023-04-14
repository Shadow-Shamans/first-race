import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import { selectIsDarkMode, setTheme } from '@/features/User'
import type { RootState, AppDispatch } from '@/store'

import type { ThemeNames } from './types'

// todo: Use throughout your app instead of plain `useDispatch` and `useSelector`
// todo: https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useTheme = () => {
  const appDispatch = useAppDispatch()
  const isDarkMode = useAppSelector(selectIsDarkMode)
  const themeName: ThemeNames = isDarkMode ? 'light' : 'dark'

  const handleChangeTheme = () => {
    appDispatch(setTheme(themeName))
  }

  return { handleChangeTheme, themeName, isDarkMode }
}
