import Rating from '@/pages/Rating'
import ErrorPage from '@/pages/ErrorPage'
import Forum from '@/pages/Forum'
import ForumTopic from '@/pages/ForumTopic'
import Game from '@/pages/Game'
import Login from '@/pages/Login'
import Main from '@/pages/Main'
import Profile from '@/pages/Profile'
import Registration from '@/pages/Registration'

export const routesConfig = [
  {
    path: '/',
    exact: true,
    component: <Main />,
    isPrivate: false,
  },
  {
    path: '/main',
    exact: true,
    component: <Main />,
    isPrivate: false,
  },
  {
    path: '/login',
    exact: true,
    component: <Login />,
    isPrivate: false,
  },
  {
    path: '/registration',
    exact: true,
    component: <Registration />,
    isPrivate: false,
  },
  {
    path: '/rating',
    exact: true,
    component: <Rating />,
    isPrivate: true,
  },
  {
    path: '/forum',
    exact: true,
    component: <Forum />,
    isPrivate: true,
  },
  {
    path: '/forum/topic/:id',
    exact: true,
    component: <ForumTopic />,
    isPrivate: true,
  },
  {
    path: '/profile',
    exact: true,
    component: <Profile />,
    isPrivate: true,
  },
  {
    path: '/game',
    exact: true,
    component: <Game />,
    isPrivate: false,
  },
  {
    path: '*',
    exact: true,
    component: <ErrorPage code="400" text="Вы не туда попали(" />,
    isPrivate: false,
  },
]
