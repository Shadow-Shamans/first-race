import { FC, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

interface IProps {
  isLoggedin: boolean;
  children: ReactElement;
}

export const PrivateRoute: FC<IProps> = ({ isLoggedin, children }) => {
  if (!isLoggedin) {
    return <Navigate to="/login" />
  }
  return children
}
