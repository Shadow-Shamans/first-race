import { TMenuItem } from './types'

export const menuItems: TMenuItem[] = [
  {
    label: 'Главная',
    path: '/main',
    isPrivate: false,
    isAuthHidden: true,
  },
  {
    label: 'Логин',
    path: '/login',
    isPrivate: false,
    isAuthHidden: false,
  },
  {
    label: 'Регистрация',
    path: '/registration',
    isPrivate: false,
    isAuthHidden: false,
  },
  {
    label: 'Профиль',
    path: '/profile',
    isPrivate: true,
    isAuthHidden: true,
  },
  {
    label: 'Форум',
    path: '/forum',
    isPrivate: true,
    isAuthHidden: true,
  },
  {
    label: 'Лидерборд',
    path: '/rating',
    isPrivate: true,
    isAuthHidden: true,
  },
]
