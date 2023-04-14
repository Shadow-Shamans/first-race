import { RootState } from '@/store'

export const selectIsLoggedIn = ({ auth }: RootState) => auth.isLoggedIn
