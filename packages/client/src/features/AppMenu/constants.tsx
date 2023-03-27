import {
  SelectOutlined,
  UserOutlined,
  HomeOutlined,
  PlaySquareOutlined,
  ProfileOutlined,
  UsergroupDeleteOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

export const menuLinks: MenuProps['items'] = [
  {
    label: 'Главная',
    key: 'main',
    icon: <HomeOutlined />,
  },
  {
    label: 'Логин',
    key: 'login',
    icon: <UserOutlined />,
  },
  {
    label: 'Регистрация',
    key: 'registration',
    icon: <SelectOutlined />,
  },
  {
    label: 'Профиль',
    key: 'profile',
    icon: <ProfileOutlined />,
  },
  {
    label: 'Форум',
    key: 'forum',
    icon: <UsergroupDeleteOutlined />,
  },
  {
    label: 'Игра',
    key: 'game',
    icon: <PlaySquareOutlined />,
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Дизайн система
      </a>
    ),
    key: 'ant',
  },
]
