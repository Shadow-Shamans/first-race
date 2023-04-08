import { FC } from 'react'
import { Layout } from 'antd'
import ForumList from '@/features/ForumList'
import styles from './Forum.module.css'
import { useTheme } from '@/app'

export const Forum: FC = () => {
  const { isDarkMode } = useTheme()
  return (
    <Layout
      className={`${styles.layout} ${
        isDarkMode ? styles.darkBg : styles.whiteBg
      }`}>
      <Layout.Content>
        <ForumList />
      </Layout.Content>
    </Layout>
  )
}
