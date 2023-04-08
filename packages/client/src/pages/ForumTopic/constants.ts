import { IForumTopicMessage } from './types'

export const MESSAGES_PER_LOAD = 5

export const initialMessagesState = {
  initialLoading: false,
  isError: false,
  messages: [],
  messagesShift: 0,
  totalElements: 0,
}

export const tempObject: IForumTopicMessage = {
  userId: '',
  avatar: '',
  content: '',
  date: '',
}
