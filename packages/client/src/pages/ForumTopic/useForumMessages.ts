import { useEffect, useState, useCallback } from 'react'
import { forumTopicTempData } from './mockData'
import { IForumMessagesState, IForumTopicMessage } from './types'
import {
  MESSAGES_PER_LOAD,
  initialMessagesState,
  tempObject,
} from './constants'

const { messages: fakeMessages } = forumTopicTempData

const useForumMessages = () => {
  const [state, setState] = useState<IForumMessagesState>(initialMessagesState)
  const [loadingItem, setLoadingItem] = useState<boolean>(false)
  const [messagesList, setMessagesList] = useState<IForumTopicMessage[]>([])

  useEffect(() => {
    setState(prev => ({ ...prev, initialLoading: true }))
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        messages: fakeMessages.slice(0, MESSAGES_PER_LOAD),
        initialLoading: false,
        totalElements: fakeMessages.length,
      }))
      setMessagesList(fakeMessages.slice(0, MESSAGES_PER_LOAD))
    }, 1000)
  }, [])

  const handleLoadMore = useCallback(() => {
    const { messages, messagesShift } = state
    setLoadingItem(true)
    setMessagesList(
      messages.concat(
        [...new Array(MESSAGES_PER_LOAD)].map(() => ({
          isLoading: true,
          ...tempObject,
        }))
      )
    )
    // TODO убрать таймер и заменить реальным рестом RTK
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        messages: prev.messages.concat(
          fakeMessages.slice(
            prev.messagesShift,
            prev.messagesShift + MESSAGES_PER_LOAD
          )
        ),
        messagesShift: prev.messagesShift + 5,
      }))
      setMessagesList(
        messages.concat(
          fakeMessages.slice(messagesShift, messagesShift + MESSAGES_PER_LOAD)
        )
      )
      setLoadingItem(false)
    }, 5000)
  }, [state, messagesList])

  return {
    messagesList,
    loadingItem,
    badgeColor: forumTopicTempData.badgeColor,
    topic: forumTopicTempData.topicTitle,
    ...state,
    handleLoadMore,
  }
}
export default useForumMessages
