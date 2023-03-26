import { FC, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

type TProps = {
  isLoggedin: boolean;
  children: ReactElement;
}

export const PrivateRoute: FC<TProps> = ({ isLoggedin, children }) => {
  if (!isLoggedin) {
    return <Navigate to="/login" />
  }
  return children
};
