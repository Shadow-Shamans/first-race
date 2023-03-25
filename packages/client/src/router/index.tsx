import { useAppSelector } from '@/app';
import { selectIsLoggedIn } from '@/features/Auth';
import AsyncComponent from '@/shared/HOCS/AsyncComponent';
import PrivateRoute from '@/shared/HOCS/PrivateRoute';
import { Route, Routes } from 'react-router-dom';

const Login = AsyncComponent(() => import('../pages/Login'))
const Registration = AsyncComponent(() => import('../pages/Registration'))
const Main = AsyncComponent(() => import('../pages/Main'))
const Forum = AsyncComponent(() => import('../pages/Forum'))
const Profile = AsyncComponent(() => import('../pages/Profile'))
const Game = AsyncComponent(() => import('../pages/Game'))
const NotFound = AsyncComponent(() => import('../pages/NotFound'))


const AppRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/main" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route
        path="/forum"
        element={(
          <PrivateRoute isLoggedin={isLoggedIn}>
            <Forum />
          </PrivateRoute>
        )}
      />
      <Route
        path="/profile"
        element={(
          <PrivateRoute isLoggedin={isLoggedIn}>
            <Profile />
          </PrivateRoute>
        )}
      />
      <Route path="/game" element={<Game />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
