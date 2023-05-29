import { FC } from 'react'
import { List } from 'antd'
import { useMessages } from '@/shared/hooks/useMessages'
import { ForumMessage } from './components/ForumMessage'

export const ForumMessages: FC = () => {
  const { isLoading, messages } = useMessages()

  return (
    <List
      loading={isLoading}
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={message => {
        return <ForumMessage key={message.content} message={message} />
      }}
    />
  )
}
