import { FC } from 'react'
import { Layout, Typography, Badge } from 'antd'
import styles from './ForumTopic.module.css'
import ForumMessages from '@/features/ForumMessages'

export const ForumTopic: FC = () => {
  const topic = 'баги'
  const badgeColor = 'green'
  return (
    <Layout className={styles.layout}>
      <Layout.Header className={styles.header}>
        <Typography className={styles.title}>
          Зависает на первом уровне
        </Typography>
        <Badge
          className={styles.badge}
          text={<span className={styles.badgeText}>{topic}</span>}
          color={badgeColor}
          size="small"
          dot={false}
        />
      </Layout.Header>
      <Layout.Content>
        <ForumMessages />
      </Layout.Content>
    </Layout>
  )
}
