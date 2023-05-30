import { FC, useEffect, useState } from 'react'
import { Button, Input, List, message } from 'antd'
import { ForumMessage } from './components/ForumMessage'
import { useCreateCommentMutation } from '@/shared/services/ForumService'
import { useAppSelector } from '@/app'
import { selectUserData } from '@/features/User'
import { selectTopic } from '@/features/Forum'
import { useTopic } from '@/shared/hooks/useTopic'
import { useMessages } from '@/shared/hooks'

interface IProps {
  parentId: string
}

export const ForumMessages: FC<IProps> = ({ parentId }) => {
  const [messageApi, contextHolder] = message.useMessage()

  const { id: userId } = useAppSelector(selectUserData)
  const { id: topicId } = useAppSelector(selectTopic)

  const { isLoading } = useTopic()
  const { messages, refreshMessages } = useMessages(parentId)

  const [comment, setComment] = useState('')

  const [createComment, mutationResult] = useCreateCommentMutation()

  const handleCreateComment = () => {
    if (!userId) return

    createComment({ userId: userId.toString(), content: comment, id: topicId })
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

  return (
    <>
      <List
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={message => {
          return <ForumMessage key={message.content} comment={message} />
        }}
      />

      <div>
        <Input.TextArea
          value={comment}
          onChange={event => setComment(event.target.value)}
          placeholder="Комментарий"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />

        <Button
          type="primary"
          style={{ marginTop: '16px' }}
          onClick={handleCreateComment}>
          Отправить
        </Button>
      </div>

      {contextHolder}
    </>
  )
}
