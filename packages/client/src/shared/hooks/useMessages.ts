import { useEffect, useState } from 'react'
import {
  useLazyGetCommentsQuery,
  IForumComment,
} from '@/shared/services/ForumService'

export const useMessages = (parentId: string) => {
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<IForumComment[]>([])

  const [getComments, commentsInfo] = useLazyGetCommentsQuery()

  const refreshMessages = () => {
    try {
      getComments({ id: parentId })
    } catch (error) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getComments({ id: parentId })
  }, [])

  useEffect(() => {
    if (commentsInfo.status === 'fulfilled' && commentsInfo.data) {
      setIsLoading(false)
      setMessages(commentsInfo.data.data)
    }

    if (commentsInfo.status === 'rejected') {
      setIsLoading(false)
    }
  }, [commentsInfo])

  return {
    isLoading,
    messages,
    refreshMessages,
  }
}
