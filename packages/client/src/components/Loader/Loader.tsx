import { Spin } from 'antd'

import styles from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={styles.root}>
      <Spin tip="Loading" size="large" />
    </div>
  )
}
