import { IForumTopicMessage } from '@/pages/ForumTopic/types'
import { Avatar, List, Skeleton, Typography } from 'antd'
import { FC } from 'react'
import styles from './ForumMessages.module.css'
import classNames from 'classnames'

interface IMessageProps {
  message: IForumTopicMessage
  isLoading: boolean
  idx: number
}

export const ForumMessage: FC<IMessageProps> = ({
  message,
  isLoading,
  idx,
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
          avatar={<Avatar shape="circle" size="default" src={message.avatar} />}
          description={
            <div
              className={classNames(styles.messageBody, {
                [styles.messageBodyReverse]: isFromMe,
              })}>
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
}
