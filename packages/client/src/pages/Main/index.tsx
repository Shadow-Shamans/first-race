import { FC } from 'react'
import {
  Button,
  Card,
  Space,
  DatePicker,
  version,
} from 'antd'
import styles from './main.module.css'
import { useTheme } from '@/app/hooks'

const Main: FC = () => {
  const { handleChangeTheme, themeName } = useTheme()
  return (
    <Card style={{ width: 'max-content' }}>
    <div className={styles.container}>
      <h1>antd version: {version}</h1>
      <Space>
        <DatePicker />
        <Button type="primary">Primary Button</Button>
      </Space>
      <Button onClick={handleChangeTheme}>
        Change Theme to {themeName}
      </Button>
    </div>
  </Card>
  )
}

export default Main