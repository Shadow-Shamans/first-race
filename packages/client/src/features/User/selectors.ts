import { RootState } from '@/store'

export const selectIsDarkMode = ({ user }: RootState) => user.theme === 'dark'
