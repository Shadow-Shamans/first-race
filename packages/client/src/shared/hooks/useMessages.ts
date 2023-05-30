import { useEffect, useState } from 'react'
import { IForumMessage } from '@/pages/ForumTopic/types'

export const useMessages = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<IForumMessage[]>([])
  const [topic, setTopic] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
      setMessages([])
      setTopic('Topic name 123')
    }, 1000)
  }, [])

  return {
    isLoading,
    messages,
    topic,
  }
}
