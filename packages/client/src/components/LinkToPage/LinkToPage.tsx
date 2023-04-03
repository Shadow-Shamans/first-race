import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './LinkToPage.module.css'

interface IProps {
  text: string
  to: string
}
export const LinkToPage: FC<IProps> = ({ text, to }) => {
  return (
    <Link to={to} relative="path" className={styles.link}>
      <p className={styles.text}>{text}</p>
    </Link>
  )
}
