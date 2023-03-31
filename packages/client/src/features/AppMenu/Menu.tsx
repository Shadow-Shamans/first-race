import { useState, FC } from 'react'
import type { MenuProps } from 'antd'
import { Menu as AntdMenu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { menuLinks } from './constants'

export const Menu: FC = () => {
  const [current, setCurrent] = useState('mail')
  const navigate = useNavigate()

  const handleClick: MenuProps['onClick'] = e => {
    const { key } = e
    setCurrent(key)
    navigate(`/${key}`)
  }

  return (
    <AntdMenu
      selectedKeys={[current]}
      mode="horizontal"
      items={menuLinks}
      onClick={handleClick}
    />
  )
}
