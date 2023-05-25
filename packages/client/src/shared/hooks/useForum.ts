import { useEffect, useState } from 'react'
import { IForumItem } from '@/pages/Forum/types'
import { topicsMock } from '@/mock/mockForum'

export const useForum = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [topics, setTopics] = useState<IForumItem[]>([])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
      setTopics(topicsMock)
    }, 1000)
  }, [])

  return {
    isLoading,
    topics,
  }
}
