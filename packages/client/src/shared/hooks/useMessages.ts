import { useEffect, useState } from 'react'
import { messagesMock } from '@/mock/mockForum'
import { IForumMessage } from '@/pages/ForumTopic/types'

export const useMessages = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<IForumMessage[]>([])
  const [topic, setTopic] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
      setMessages(messagesMock)
      setTopic('Topic name 123')
    }, 1000)
  }, [])

  return {
    isLoading,
    messages,
    topic,
  }
}
