import { FC } from 'react'
import { Layout } from 'antd'
import styles from './Forum.module.css'
import ForumList from '@/features/ForumList'

export const Forum: FC = () => (
  <Layout className={styles.layout}>
    <Layout.Content>
      <ForumList />
    </Layout.Content>
  </Layout>
)
