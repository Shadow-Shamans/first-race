import { RootState } from '@/store'

export const selectIsLoggedIn = ({ auth }: RootState) => auth.isLoggedIn
export const selectAuthCode = ({ auth }: RootState) => auth.code
