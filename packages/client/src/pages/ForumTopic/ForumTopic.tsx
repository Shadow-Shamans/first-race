import { FC } from 'react'
import { Layout, Typography, Badge, Input, Button } from 'antd'
import ForumMessages from '@/features/ForumMessages'
import useForumMessages from './useForumMessages'
import { useTheme } from '@/app'
import styles from './ForumTopic.module.css'

const { TextArea } = Input

const handleSend = () => {
  console.log('send message')
}

export const ForumTopic: FC = () => {
  const {
    initialLoading,
    messagesList,
    badgeColor,
    topic,
    loadingItem,
    handleLoadMore,
  } = useForumMessages()
  const { isDarkMode } = useTheme()
  return (
    <Layout
      className={`${styles.layout} ${
        isDarkMode ? styles.darkBg : styles.whiteBg
      }`}>
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
      <Layout.Footer className={styles.footer}>
        <TextArea
          rows={4}
          placeholder="Введите сообщение"
          onPressEnter={handleSend}
          maxLength={200}
          defaultValue="Ну а ты чего хотел. Попробуй по данной ссылке"
        />
        <Button type="default" className={styles.button} onClick={handleSend} />
      </Layout.Footer>
    </Layout>
  )
}
