import { FC } from 'react'
import { Layout } from 'antd'
import ForumList from '@/features/ForumList'
import styles from './Forum.module.css'

export const Forum: FC = () => (
  <Layout data-testid="forum_root" className={`${styles.layout}`}>
    <Layout.Content>
      <ForumList />
    </Layout.Content>
  </Layout>
)
