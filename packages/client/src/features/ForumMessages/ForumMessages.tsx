import { IForumTopicMessage } from '@/pages/ForumTopic/types'
import { Avatar, Button, List, Skeleton, Typography } from 'antd'
import { FC } from 'react'
import { loadMoreBtnSx } from '@/assets/styles/buttons'
import { forumTopicTempData } from '@/pages/ForumTopic/mockData'
import styles from './ForumMessages.module.css'

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

interface IMessageProps {
  message: IForumTopicMessage
  isLoading: boolean
  idx: number
}

const ForumMessage: FC<IMessageProps> = ({ message, isLoading, idx }) => (
  <List.Item>
    <Skeleton avatar title={false} loading={isLoading} active>
      <List.Item.Meta
        className={`${
          idx % 2 === 0 ? styles.listItem : styles.listItemReverse
        }`}
        key={message.userId}
        avatar={<Avatar shape="circle" size="default" src={message.avatar} />}
        description={
          <div
            className={`${styles.messageBody}  ${
              idx % 2 === 0 ? styles.messageBodyReverse : ''
            }`}>
            <Typography className={styles.content}>
              {message.content}
            </Typography>
            <Typography className={styles.date}>{message.date}</Typography>
          </div>
        }
      />
    </Skeleton>
  </List.Item>
)
