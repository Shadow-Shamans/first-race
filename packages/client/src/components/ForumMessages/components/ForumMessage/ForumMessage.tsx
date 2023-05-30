import React, { FC, useEffect, useState } from 'react'
import { Button, Card, Divider, Input, List, message, Typography } from 'antd'
import classNames from 'classnames'
import {
  IForumComment,
  useCreateCommentMutation,
} from '@/shared/services/ForumService'
import { useAppSelector } from '@/app'
import { selectUserData } from '@/features/User'
import { convertDateTime } from '@/shared/utils/dateTime'

import styles from './ForumMessage.module.css'

interface IProps {
  comment: IForumComment
}

export const ForumMessage: FC<IProps> = ({ comment }) => {
  const [date, time] = convertDateTime(comment.createdAt)

  const [messageApi, contextHolder] = message.useMessage()

  const { id: userId } = useAppSelector(selectUserData)

  const [reply, setReply] = useState('')
  const [isHidden, setIsHidden] = useState(true)

  const [createComment, mutationResult] = useCreateCommentMutation()

  const handleCreateComment = () => {
    if (isHidden) {
      setIsHidden(false)

      return
    }

    if (!userId) return

    createComment({ userId: userId.toString(), content: reply, id: comment.id })
  }

  useEffect(() => {
    if (mutationResult.status === 'fulfilled' && mutationResult.data) {
      setReply('')
    }

    if (mutationResult.status === 'rejected') {
      messageApi.open({
        type: 'error',
        content: `Ошибка при добавлении комментария`,
      })
    }
  }, [mutationResult])

  return (
    <List.Item>
      <Card className={styles.block}>
        <div className={styles.content}>
          <p>{comment.content}</p>

          <div>
            <Typography.Text className={styles.date}>{time}</Typography.Text>

            <Typography.Text type="secondary" className={styles.date}>
              {date}
            </Typography.Text>
          </div>
        </div>

        <Divider />

        {comment.messageCount > 0 && (
          <Button style={{ marginBottom: '16px' }} type="primary">
            Показать ответы
          </Button>
        )}

        <Input.TextArea
          placeholder="Ответить"
          className={classNames(styles.field, { [styles.hidden]: isHidden })}
          onChange={event => setReply(event.target.value)}
        />

        <Button type="primary" onClick={handleCreateComment}>
          Ответить
        </Button>
      </Card>

      {contextHolder}
    </List.Item>
  )
}
