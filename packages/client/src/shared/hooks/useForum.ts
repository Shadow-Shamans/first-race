import { useEffect, useState } from 'react'
import {
  IForumItem,
  useLazyGetTopicsQuery,
} from '@/shared/services/ForumService'
import { ISortOption, sortByNew } from '@/shared/utils/dateTime'
import { TFilterOption } from '@/components/TopicList/components/Controls/Controls'
import { useAppSelector } from '@/app'
import { selectUserData } from '@/features/User'

export const useForum = () => {
  const { id: userId } = useAppSelector(selectUserData)

  const [isLoading, setIsLoading] = useState(true)
  const [topics, setTopics] = useState<IForumItem[]>([])
  const [filteredTopics, setFilteredTopics] = useState<IForumItem[]>([])

  const [getTopics, topicsList] = useLazyGetTopicsQuery()

  const filterTopics = (filters: TFilterOption[]) => {
    let filtered = topics

    if (filters.includes('own')) {
      filtered = filtered.filter(topic => topic.userId === userId)
    }

    if (filters.includes('withAnswers')) {
      filtered = filtered.filter(topic => topic.messageCount > 0)
    }

    setFilteredTopics(filtered)
  }

  const refreshTopics = () => {
    getTopics()
  }

  useEffect(() => {
    if (topicsList.data && topicsList.status === 'fulfilled') {
      const sortedTopics = sortByNew(topicsList.data.data as ISortOption[])

      setTopics(sortedTopics as IForumItem[])
      setFilteredTopics(sortedTopics as IForumItem[])
      setIsLoading(false)
    }

    if (topicsList.status === 'rejected') {
      setTopics([])
      setFilteredTopics([])
      setIsLoading(false)
    }
  }, [topicsList])

  return {
    isLoading,
    refreshTopics,
    topics,
    setTopics,
    filterTopics,
    filteredTopics,
  }
}
