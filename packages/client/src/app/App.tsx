import {
  ConfigProvider,
  theme,
  Button,
  Card,
  Space,
  DatePicker,
  version,
} from 'antd'
import { useAppDispatch, useAppSelector } from './hooks'
import { checkIsDarkMode, setTheme } from '../features/User'
import type { ThemeNames } from './types'
import { useGetTestDataQuery } from './api'

import styles from './App.module.css'
import './index.css'

export function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme
  const appDispatch = useAppDispatch()
  const isDarkMode = useAppSelector(checkIsDarkMode)
  const themeName: ThemeNames = isDarkMode ? 'light' : 'dark'
  const { data, isLoading, error } = useGetTestDataQuery('')

  const handleClick = () => {
    appDispatch(setTheme(themeName))
  }

  if (isLoading) {
    return <h1>Loading test data using RTKQuery</h1>
  }

  if (error) {
    return <h1>Error</h1>
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}>
      <Card style={{ width: 'max-content' }}>
        <div className={styles.container}>
          <h1>antd version: {version}</h1>
          <Space>
            <DatePicker />
            <Button type="primary">Primary Button</Button>
          </Space>

          {data && <h2>loaded data: {data}</h2>}

          <Button onClick={handleClick}>Change Theme to {themeName}</Button>
        </div>
      </Card>
    </ConfigProvider>
  )
}
