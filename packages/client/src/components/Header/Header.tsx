import { FC } from 'react'
import { Menu } from '@/components/Menu'

import logo from '@/assets/icons/logo.svg'

import styles from './Header.module.css'

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt="logo" />
      <Menu />
    </header>
  )
}
