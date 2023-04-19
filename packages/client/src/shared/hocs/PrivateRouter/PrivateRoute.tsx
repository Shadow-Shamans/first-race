import { FC, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

interface IProps {
  isLoggedIn: boolean
  children: ReactElement
}

export const PrivateRoute: FC<IProps> = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }
  return children
}
