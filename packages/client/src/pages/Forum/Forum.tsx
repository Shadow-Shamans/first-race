import { FC } from 'react'
import { Layout } from 'antd'
import { TopicList } from '@/components/TopicList'
import styles from './Forum.module.css'

export const Forum: FC = () => (
  <Layout data-testid="forum_root" className={`${styles.layout}`}>
    <Layout.Content>
      <TopicList />
    </Layout.Content>
  </Layout>
)
