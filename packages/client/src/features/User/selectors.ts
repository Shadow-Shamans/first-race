import { RootState } from '@/store'

export const selectIsDarkMode = ({ user }: RootState) => user.theme === 'dark'
export const selectUserData = ({ user }: RootState) => user
