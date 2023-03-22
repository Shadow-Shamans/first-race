import { useEffect } from 'react'
import 'antd/dist/reset.css'
import styles from './App.module.css'

export function App() {
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
    <div className={styles.container}>
      <h1>First Race</h1>
    </div>
  )
}
