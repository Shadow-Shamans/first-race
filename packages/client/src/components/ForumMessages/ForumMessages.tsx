import { FC, useEffect, useState } from 'react'
import { Button, Input, List, message } from 'antd'
import { ForumMessage } from './components/ForumMessage'
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from '@/shared/services/ForumService'
import { useAppSelector } from '@/app'
import { selectUserData } from '@/features/User'
import { useTopic } from '@/shared/hooks/useTopic'
import { useMessages } from '@/shared/hooks'

import styles from './ForumMessages.module.css'

interface IProps {
  parentId: string
}

export const ForumMessages: FC<IProps> = ({ parentId }) => {
  const [messageApi, contextHolder] = message.useMessage()

  const { id: userId } = useAppSelector(selectUserData)

  const { isLoading } = useTopic()
  const { messages, refreshMessages } = useMessages(parentId)

  const [comment, setComment] = useState('')

  const [createComment, mutationResult] = useCreateCommentMutation()
  const [deleteComment, mutationResultDelete] = useDeleteCommentMutation()

  const handleCreateComment = () => {
    if (!userId) return

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
    }

    if (mutationResultDelete.status === 'rejected') {
      messageApi.open({
        type: 'error',
        content: `Ошибка при удалении комментария`,
      })
    }
  }, [mutationResultDelete])

  return (
    <>
      <List
        locale={{ emptyText: '' }}
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

        <Button
          type="primary"
          className={styles.button}
          onClick={handleCreateComment}>
          Отправить
        </Button>
      </div>

      {contextHolder}
    </>
  )
}
