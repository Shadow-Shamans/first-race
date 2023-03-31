import React, { FC } from 'react'
import styles from './LayoutFullPage.module.css'

interface IProps {
  children?: React.ReactNode
}
export const LayoutFullPage: FC<IProps> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>
}
