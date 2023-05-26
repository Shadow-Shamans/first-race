import { Route, Routes } from 'react-router-dom'
import { routesConfig } from './config'
import { useAppSelector } from '@/app/hooks'
import { selectIsLoggedIn } from '@/features/Auth'
import PrivateRoute from '@/shared/hocs/PrivateRouter'
import useAuth from '@/shared/hooks/useAuth'

export const AppRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  useAuth()

  return (
    <Routes>
      {routesConfig.map(route => {
        const element = route.isPrivate ? (
          <PrivateRoute isLoggedIn={isLoggedIn}>{route.component}</PrivateRoute>
        ) : (
          route.component
        )
        return <Route key={route.path} element={element} path={route.path} />
      })}
    </Routes>
  )
}
