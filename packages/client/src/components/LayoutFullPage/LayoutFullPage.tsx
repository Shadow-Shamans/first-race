import React from 'react'
import styles from './LayoutFullPage.module.css'

interface ILayoutFullPageProps {
  children?: React.ReactNode
}

export function LayoutFullPage({ children }: ILayoutFullPageProps) {
  return <div className={styles.layout}>{children}</div>
}
