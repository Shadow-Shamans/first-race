import { useState, FC } from 'react'
import { Typography } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { menuItems, TPath } from './constants'

import styles from './menu.module.css'
import { Button } from '../Button/Button'

const { Text } = Typography

export const Menu: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [current, setCurrent] = useState<TPath>(location.pathname as TPath)

  const handleClick = (path: TPath) => {
    setCurrent(path)

    navigate(path)
  }

  return (
    <ul className={styles.list}>
      {menuItems.map(({ label, path }) => {
        const isActive = current === path
        const classNames = `${styles.item} ${isActive ? styles.active : ''}`

        return (
          <li
            key={path}
            className={classNames}
            onClick={() => handleClick(path)}>
            <Text strong>{label}</Text>
          </li>
        )
      })}

      <li>
        <Button type={'primary'} onClick={() => handleClick('/game')}>
          Играть
        </Button>
      </li>
    </ul>
  )
}
