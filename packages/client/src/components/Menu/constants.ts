import { TMenuItem } from './types'

export const menuItems: TMenuItem[] = [
  {
    label: 'Главная',
    path: '/main',
    isPrivate: false,
  },
  {
    label: 'Логин',
    path: '/login',
    isPrivate: false,
  },
  {
    label: 'Регистрация',
    path: '/registration',
    isPrivate: false,
  },
  {
    label: 'Профиль',
    path: '/profile',
    isPrivate: true,
  },
  {
    label: 'Форум',
    path: '/forum',
    isPrivate: true,
  },
  {
    label: 'Лидерборд',
    path: '/rating',
    isPrivate: true,
  },
]
