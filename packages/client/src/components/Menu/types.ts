export type TPath =
  | '/main'
  | '/login'
  | '/registration'
  | '/profile'
  | '/forum'
  | '/game'

type TMenuItem = {
  label: string
  path: TPath
}

export const menuItems: TMenuItem[] = [
  {
    label: 'Главная',
    path: '/main',
  },
  {
    label: 'Логин',
    path: '/login',
  },
  {
    label: 'Регистрация',
    path: '/registration',
  },
  {
    label: 'Профиль',
    path: '/profile',
  },
  {
    label: 'Форум',
    path: '/forum',
  },
]
