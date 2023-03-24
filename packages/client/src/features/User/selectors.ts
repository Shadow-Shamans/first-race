import { RootState } from '@/store'

export const selectIsDarkMode = ({ user }: RootState) => user.theme === 'dark'
export const selectUserName = ({ user }: RootState) => user.name
export const selectUserId = ({ user }: RootState) => user.id
