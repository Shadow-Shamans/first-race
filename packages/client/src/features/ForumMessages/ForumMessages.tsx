import { IForumTopicMessage } from '@/pages/ForumTopic/types'
import { Avatar, Button, List, Skeleton, Typography } from 'antd'
import { FC } from 'react'
import { loadMoreBtnSx } from '@/assets/styles/buttons'
import styles from './ForumMessages.module.css'
import { forumTopicTempData } from '@/pages/ForumTopic/mockData'

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
          style={loadMoreBtnSx}
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
      className={styles.loadmoreList}
      loading={isLoading}
      itemLayout="horizontal"
      size="small"
      loadMore={loadMore}
      dataSource={messages}
      renderItem={message => (
        <ForumMessage
          message={message}
          isLoading={message.isLoading as boolean}
        />
      )}
    />
  )
}

interface IMessageProps {
  message: IForumTopicMessage
  isLoading: boolean
}

const ForumMessage: FC<IMessageProps> = ({ message, isLoading }) => (
  <List.Item className={styles.listItem} key={message.userId}>
    <Skeleton avatar title={false} loading={isLoading} active>
      <List.Item.Meta
        avatar={<Avatar shape="circle" size="default" src={message.avatar} />}
        description={
          <>
            <Typography className={styles.lastMessage}>
              {message.content}
            </Typography>
            <Typography className={styles.totalMessages}>
              {message.date}
            </Typography>
          </>
        }
      />
    </Skeleton>
  </List.Item>
)
