import { FC } from 'react'
import { Layout, Typography, Badge } from 'antd'
import ForumMessages from '@/features/ForumMessages'
import useForumMessages from './useForumMessages'
import styles from './ForumTopic.module.css'

export const ForumTopic: FC = () => {
  const {
    initialLoading,
    messagesList,
    badgeColor,
    topic,
    loadingItem,
    handleLoadMore,
  } = useForumMessages()
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
        <ForumMessages
          messages={messagesList}
          isLoading={initialLoading}
          loadingItem={loadingItem}
          handleLoadMore={handleLoadMore}
        />
      </Layout.Content>
    </Layout>
  )
}
