import { IForumTopicMessage } from '@/pages/ForumTopic/types'
import { Button, List } from 'antd'
import { FC } from 'react'
import { loadMoreBtnStyles } from '@/assets/styles/buttons'
import { forumTopicTempData } from '@/pages/ForumTopic/mockData'
import styles from './ForumMessages.module.css'
import { ForumMessage } from './ForumMessage'

interface IProps {
  messages: IForumTopicMessage[]
  isLoading: boolean
  loadingItem: boolean
  handleLoadMore: () => void
}

export const ForumMessages: FC<IProps> = ({
  messages,
  isLoading,
  loadingItem,
  handleLoadMore,
}) => {
  const loadMore =
    !isLoading && !loadingItem ? (
      <div className={styles.loadMoreBtn}>
        <Button
          style={loadMoreBtnStyles}
          onClick={handleLoadMore}
          disabled={messages.length === forumTopicTempData.messages.length}>
          {messages.length === forumTopicTempData.messages.length
            ? 'Сообщений больше нет'
            : 'Загрузить еще 5 сообщений'}
        </Button>
      </div>
    ) : null

  return (
    <List
      className={styles.loadMoreList}
      loading={isLoading}
      bordered={false}
      itemLayout="horizontal"
      size="small"
      loadMore={loadMore}
      dataSource={messages}
      renderItem={(message, idx) => {
        return (
          <ForumMessage
            idx={idx}
            key={message.content}
            message={message}
            isLoading={message.isLoading as boolean}
          />
        )
      }}
    />
  )
}
