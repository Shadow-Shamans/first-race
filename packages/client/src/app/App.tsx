import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {
  ConfigProvider,
  theme,
  Button,
  Card,
  Space,
  DatePicker,
  version,
} from 'antd'

import store, { persistor } from '@/store'

import { useGetTestDataQuery } from './api'
import { useTheme } from './hooks'
import styles from './App.module.css'
import './index.css'

function AppInner() {
  const { defaultAlgorithm, darkAlgorithm } = theme
  const { handleChangeTheme, themeName, isDarkMode } = useTheme()
  const { data, isLoading, error } = useGetTestDataQuery('')

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

          <Button onClick={handleChangeTheme}>
            Change Theme to {themeName}
          </Button>
        </div>
      </Card>
    </ConfigProvider>
  )
}

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={'Loading...'} persistor={persistor}>
      <AppInner />
    </PersistGate>
  </Provider>
)
