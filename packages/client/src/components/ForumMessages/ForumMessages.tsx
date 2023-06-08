import React, { useState, useEffect, FC } from 'react'
import { Button, Input, List, message } from 'antd'
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from '@/shared/services/ForumService'
import { useAppSelector } from '@/app'
import { selectUserData } from '@/features/User'
import { useTopic } from '@/shared/hooks/useTopic'
import { useMessages } from '@/shared/hooks'
import { ForumMessage } from './components/ForumMessage'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { SmileOutlined } from '@ant-design/icons'

import styles from './ForumMessages.module.css'

interface IProps {
  parentId: string
}

export const ForumMessages: FC<IProps> = ({ parentId }) => {
  const [messageApi, contextHolder] = message.useMessage()

  const { id: userId } = useAppSelector(selectUserData)

  const { isLoading, refreshTopic } = useTopic()
  const { messages, refreshMessages } = useMessages(parentId)

  const [comment, setComment] = useState('')
  const [emojiVisibility, setEmojiVisibility] = useState(false)

  const [createComment, mutationResult] = useCreateCommentMutation()
  const [deleteComment, mutationResultDelete] = useDeleteCommentMutation()

  const handleCreateComment = () => {
    if (!userId || !comment) return

    createComment({ userId: userId.toString(), content: comment, id: parentId })
  }

  const handleDeleteComment = (id: string) => {
    deleteComment({ id })
  }

  useEffect(() => {
    if (mutationResult.status === 'fulfilled' && mutationResult.data) {
      messageApi.open({
        type: 'success',
        content: `Комментарий добавлен`,
      })

      refreshMessages()
      refreshTopic()

      setComment('')
    }

    if (mutationResult.status === 'rejected') {
      messageApi.open({
        type: 'error',
        content: `Ошибка при добавлении комментария`,
      })
    }
  }, [mutationResult])

  useEffect(() => {
    if (
      mutationResultDelete.status === 'fulfilled' &&
      mutationResultDelete.data
    ) {
      refreshMessages()
      refreshTopic()

      messageApi.open({
        type: 'success',
        content: `Комментарий удален`,
      })
    }

    if (mutationResultDelete.status === 'rejected') {
      messageApi.open({
        type: 'error',
        content: `Ошибка при удалении комментария`,
      })
    }
  }, [mutationResultDelete])

  const handleAddEmoji = (emoji: any) => {
    setComment(`${comment + emoji.native}`)
    setEmojiVisibility(false)
  }

  const handleEmojiVisibility = () => {
    setEmojiVisibility(!emojiVisibility)
  }

  return (
    <>
      <List
        locale={{ emptyText: <></> }}
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={message => {
          return (
            <ForumMessage
              key={message.content}
              comment={message}
              onDelete={handleDeleteComment}
            />
          )
        }}
      />

      <div className={styles.comment}>
        <Input.TextArea
          value={comment}
          onChange={event => setComment(event.target.value)}
          placeholder="Комментарий"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />

        <div className={styles.navigation}>
          <Button type="primary" onClick={handleCreateComment}>
            Отправить
          </Button>
          <div className={styles.emoji_wrapper}>
            <SmileOutlined
              className={styles.iconImages}
              rev={undefined}
              onClick={handleEmojiVisibility}
            />

            {emojiVisibility && (
              <div className={styles.emoji_container}>
                <Picker data={data} onEmojiSelect={handleAddEmoji} />
              </div>
            )}
          </div>
        </div>
      </div>

      {contextHolder}
    </>
  )
}
