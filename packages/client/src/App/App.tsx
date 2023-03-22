import { useEffect, useState } from 'react'
import {
  ConfigProvider,
  theme,
  Button,
  Card,
  Space,
  DatePicker,
  version,
} from 'antd'
import 'antd/dist/reset.css'
import styles from './App.module.css'

export function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme
  const [isDarkMode, setIsDarkMode] = useState(false)
  const handleClick = () => {
    setIsDarkMode(previousValue => !previousValue)
  }

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

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

          <Button onClick={handleClick}>
            Change Theme to {isDarkMode ? 'Light' : 'Dark'}
          </Button>
        </div>
      </Card>
    </ConfigProvider>
  )
}
