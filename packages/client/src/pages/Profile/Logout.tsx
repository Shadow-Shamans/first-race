import { useEffect } from 'react'

import styled from './Profile.module.css'

import { selectUserData } from '@/features/User/selectors'
import { useAppDispatch, useAppSelector } from '@/app'
import { useLogoutMutation } from '@/shared/services/AuthService'
import { setUserData } from '@/features/User/userSlice'
import { toogleAuth, toggleCode } from '@/features/Auth/authSlice'
import { Button } from 'antd'

export const Logout = () => {
  const appDispatch = useAppDispatch()
  const userData = useAppSelector(selectUserData)
  const [logout, result] = useLogoutMutation()

  useEffect(() => {
    if (result.requestId) {
      appDispatch(toogleAuth(false))
      appDispatch(toggleCode(''))
      appDispatch(
        setUserData({
          ...userData,
          ...{
            id: null,
            first_name: '',
            avatar: null,
            second_name: '',
            email: '',
            login: '',
            phone: '',
          },
        })
      )
    }
  }, [result.requestId])

  const handleLogout = () => {
    logout()
  }

  return (
    <Button onClick={handleLogout} className={styled.logoutText}>
      Выйти
    </Button>
  )
}
