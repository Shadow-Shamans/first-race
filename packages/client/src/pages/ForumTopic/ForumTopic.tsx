import { FC } from 'react'
import { Layout, Typography } from 'antd'
import { useMessages } from '@/shared/hooks/useMessages'
import ForumMessages from '@/features/ForumList/components/ForumMessages'

import styles from './ForumTopic.module.css'

export const ForumTopic: FC = () => {
  const { topic } = useMessages()

  return (
    <Layout className={`${styles.layout}`}>
      <Layout.Header className={styles.header}>
        <Typography.Title level={3}>{topic}</Typography.Title>
      </Layout.Header>

      <Layout.Content>
        <ForumMessages />
      </Layout.Content>
    </Layout>
  )
}
