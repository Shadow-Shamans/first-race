import { useState, FC } from 'react'
import { Typography } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { menuItems, TPath } from './types'
import { Button } from '@/components/Button'

import styles from './menu.module.css'

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

        return (
          <li
            key={path}
            className={classNames(styles.item, { [styles.active]: isActive })}
            onClick={() => handleClick(path)}>
            <Text strong>{label}</Text>
          </li>
        )
      })}

      <li>
        <Button type="primary" onClick={() => handleClick('/game')}>
          Играть
        </Button>
      </li>
    </ul>
  )
}
