import { useEffect, useState } from 'react'
import { forumTopicTempData } from './mockData'
import { IForumTopic } from './types'

const useForumMessages = () => {
  const [data, setData] = useState<IForumTopic>()
  useEffect(() => {
    setTimeout(() => {
      setData(forumTopicTempData)
    }, 1000)
  }, [])

  return {
    data,
    setData,
  }
}
export default useForumMessages
