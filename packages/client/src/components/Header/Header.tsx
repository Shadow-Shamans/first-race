import { FC } from 'react'
import { Menu } from '@/components/Menu'

import logo from '@/assets/icons/logo.svg'

import styles from './Header.module.css'
import { useLocation } from 'react-router-dom'

export const Header: FC = () => {
  const { pathname } = useLocation()

  if (pathname === '/game') {
    return null
  }

  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt="logo" />
      <Menu />
    </header>
  )
}
