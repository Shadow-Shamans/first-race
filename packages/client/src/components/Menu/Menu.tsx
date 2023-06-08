import { useState, FC } from 'react'
import { Typography } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { TPath } from './types'
import { Button } from '@/components/Button'
import { useAppSelector } from '@/app'
import { selectIsLoggedIn } from '@/features/Auth'
import { menuItems } from './constants'

import styles from './menu.module.css'

export const Menu: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [current, setCurrent] = useState<TPath>(location.pathname as TPath)

  const handleClick = (path: TPath) => {
    setCurrent(path)

    navigate(path)
  }

  return (
    <ul className={styles.list}>
      {menuItems.map(({ label, path, isPrivate, isAuthHidden }) => {
        const isActive = current === path
        const isShow = () => {
          return isLoggedIn ? isAuthHidden : !isPrivate
        }

        if (isShow()) {
          return (
            <li
              key={path}
              className={classNames(styles.item, { [styles.active]: isActive })}
              onClick={() => handleClick(path)}
              data-testid="menu-item">
              <Typography.Text strong>{label}</Typography.Text>
            </li>
          )
        }
      })}
      <li>
        <Button type="primary" onClick={() => handleClick('/game')}>
          Играть
        </Button>
      </li>
    </ul>
  )
}
