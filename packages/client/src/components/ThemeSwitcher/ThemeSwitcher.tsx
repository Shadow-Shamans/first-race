import React, { FC } from 'react'
import { Switch } from 'antd'
import { Typography } from 'antd'
import { useTheme } from '@/app'

import styles from './ThemeSwitcher.module.css'

const { Text } = Typography

export const ThemeSwitcher: FC = () => {
  const { isDarkMode, handleChangeTheme } = useTheme()

  return (
    <div className={styles.root}>
      <Text strong>Темная тема</Text>
      <Switch checked={isDarkMode} onChange={handleChangeTheme} />
    </div>
  )
}
