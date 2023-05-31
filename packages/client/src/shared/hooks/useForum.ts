import { useEffect, useState } from 'react'
import {
  IForumItem,
  useLazyGetTopicsQuery,
} from '@/shared/services/ForumService'
import { ISortOption, sortByNew } from '../utils/dateTime'

export const useForum = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [topics, setTopics] = useState<IForumItem[]>([])

  const [getTopics, topicsList] = useLazyGetTopicsQuery()

  const refreshTopics = () => {
    try {
      getTopics()
    } catch (error) {
      setIsLoading(false)
      setTopics([])
    }
  }

  useEffect(() => {
    refreshTopics()
  }, [])

  useEffect(() => {
    if (topicsList.data && topicsList.status === 'fulfilled') {
      setIsLoading(false)

      const sortedTopics = sortByNew(topicsList.data.data as ISortOption[])

      setTopics(sortedTopics as IForumItem[])
    }
  }, [topicsList])

  return {
    isLoading,
    topics,
    refreshTopics,
    setTopics,
  }
}
