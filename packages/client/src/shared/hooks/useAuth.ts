import { useAppSelector } from '@/app/hooks'
import { selectIsLoggedIn, selectAuthCode } from '@/features/Auth'
import {
  useLazyGetUserDataQuery,
  useOAuthLoginMutation,
} from '@/shared/services/AuthService'
import { useEffect } from 'react'
import { toogleAuth } from '@/features/Auth/authSlice'
import { setUserData } from '@/features/User'
import { useAppDispatch } from '@/app/hooks'

const useAuth = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const authCode = useAppSelector(selectAuthCode)
  const appDispatch = useAppDispatch()
  const [getUserData, userData] = useLazyGetUserDataQuery()
  const [oAuth, OAuthData] = useOAuthLoginMutation()

  useEffect(() => {
    if (authCode === '' || isLoggedIn) {
      return
    }

    try {
      oAuth({ code: `${authCode}`, redirect_uri: 'http://localhost:3000' })
    } catch (e) {
      console.error(e)
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (OAuthData.requestId) {
      if (OAuthData.error) {
        if (
          (OAuthData.error as { originalStatus: number }).originalStatus === 200
        ) {
          appDispatch(toogleAuth(true))
        }
      }
    }
  }, [OAuthData])

  useEffect(() => {
    try {
      getUserData()
    } catch (e) {
      console.error(e)
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (userData.data && userData.status === 'fulfilled') {
      appDispatch(setUserData(userData.data))
      appDispatch(toogleAuth(true))
    }
  }, [userData])
}

export default useAuth
