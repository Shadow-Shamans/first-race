import { useAppSelector } from '@/app'
import { Suspense, lazy } from 'react'
import { selectIsLoggedIn } from '@/features/Auth'
import PrivateRoute from '@/shared/hocs/PrivateRouter'
import { Route, Routes } from 'react-router-dom'
import { Loader } from '@/components/Loader'
import Main from '@/pages/Main'

const Login = lazy(() => import('@/pages/Login'))
const Registration = lazy(() => import('@/pages/Registration'))
const Forum = lazy(() => import('@/pages/Forum'))
const ForumTopic = lazy(() => import('@/pages/ForumTopic'))
const Profile = lazy(() => import('@/pages/Profile'))
const Game = lazy(() => import('@/pages/Game'))
const Rating = lazy(() => import('@/pages/Rating'))
const ErrorPage = lazy(() => import('@/pages/ErrorPage'))

export const AppRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/rating"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Rating />
            </PrivateRoute>
          }
        />
        <Route
          path="/forum"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Forum />
            </PrivateRoute>
          }
        />
        <Route
          path="/forum/topic/:id"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <ForumTopic />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
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
