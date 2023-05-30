import { useEffect, useState } from 'react'
import { useLazyGetTopicByIdQuery } from '@/shared/services/ForumService'
import { useAppDispatch } from '@/app'
import { setTopic } from '@/features/Forum'
import { useLocation } from 'react-router-dom'

export const useTopic = () => {
  const { pathname } = useLocation()

  const parentId = pathname.split('/').reverse()[0]

  const appDispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(true)

  const [getTopicById, topicInfo] = useLazyGetTopicByIdQuery()

  useEffect(() => {
    getTopicById({ id: parentId })
  }, [])

  useEffect(() => {
    if (topicInfo.status === 'fulfilled' && topicInfo.data) {
      appDispatch(setTopic(topicInfo.data.data))
      setIsLoading(false)
    }

    if (topicInfo.status === 'rejected') {
      setIsLoading(false)
    }
  }, [topicInfo])

  return {
    isLoading,
  }
}
