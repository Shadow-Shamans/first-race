import { useAppSelector } from '@/app'
import { Suspense, lazy } from 'react'
import { selectIsLoggedIn } from '@/features/Auth'
import PrivateRoute from '@/shared/hocs/PrivateRouter'
import { Route, Routes } from 'react-router-dom'
import { Spin } from 'antd'

const Login = lazy(() => import('@/pages/Login'))
const Registration = lazy(() => import('@/pages/Registration'))
const Main = lazy(() => import('@/pages/Main'))
const Forum = lazy(() => import('@/pages/Forum'))
const ForumTopic = lazy(() => import('@/pages/ForumTopic'))
const Profile = lazy(() => import('@/pages/Profile'))
const Game = lazy(() => import('@/pages/Game'))
const Rating = lazy(() => import('@/pages/Rating'))
const ErrorPage = lazy(() => import('@/pages/ErrorPage'))

export const AppRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return (
    <Suspense fallback={<Spin tip="Loading" size="large" />}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/rating" element={<Rating />} />
        <Route
          path="/forum"
          element={
            <PrivateRoute isLoggedin={isLoggedIn}>
              <Forum />
            </PrivateRoute>
          }
        />
        <Route
          path="/forum/topic/:id"
          element={
            <PrivateRoute isLoggedin={isLoggedIn}>
              <ForumTopic />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute isLoggedin={isLoggedIn}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/game" element={<Game />} />
        <Route
          path="*"
          element={<ErrorPage code="400" text="Вы не туда попали(" />}
        />
      </Routes>
    </Suspense>
  )
}
