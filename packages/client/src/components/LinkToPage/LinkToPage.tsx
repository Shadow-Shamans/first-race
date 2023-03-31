import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LinkToPage.module.css'

interface ILinkToPageProps {
  text: string
  to: string
}

export function LinkToPage({ text, to }: ILinkToPageProps) {
  return (
    <Link to={to} relative="path" className={styles.link}>
      <p className={styles.text}>{text}</p>
    </Link>
  )
}
