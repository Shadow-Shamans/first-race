import { FC, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

type PrivateRouteProps = {
  isLoggedin: boolean;
  children: ReactElement;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ isLoggedin, children }) => {
  if (!isLoggedin) {
    return <Navigate to="/login" />
  }
  return children
};

export default PrivateRoute
