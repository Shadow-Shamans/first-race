import { IForumTopicMessage } from '@/pages/ForumTopic/types'
import { Avatar, List, Skeleton, Typography } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import styles from './ForumMessages.module.css'

interface IMessageProps {
  message: IForumTopicMessage
  isLoading: boolean
  idx: number
  isDarkMode: boolean
}

export const ForumMessage: FC<IMessageProps> = ({
  message,
  isLoading,
  idx,
  isDarkMode,
}) => {
  // Заглушка пока нет бека
  const isFromMe = idx % 2 === 0

  return (
    <List.Item>
      <Skeleton avatar title={false} loading={isLoading} active>
        <List.Item.Meta
          className={classNames(
            isFromMe ? styles.listItem : styles.listItemReverse
          )}
          key={message.userId}
          avatar={
            <Avatar
              shape="circle"
              size="default"
              src={message.avatar}
              className={classNames({
                [styles.avatarReverse]: !isFromMe,
              })}
            />
          }
          description={
            <div
              style={{ backgroundColor: isDarkMode ? '#393646' : '#ECECEC' }}
              className={classNames(styles.messageBody, {
                [styles.messageBodyReverse]: isFromMe,
              })}>
              <Typography
                className={styles.content}
                style={{
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : '#000',
                }}>
                {message.content}
              </Typography>

              <Typography className={styles.date}>{message.date}</Typography>
            </div>
          }
        />
      </Skeleton>
    </List.Item>
  )
}
