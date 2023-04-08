export interface IForumTopicMessage {
  userId: string
  avatar: string
  content: string
  date: string
  isLoading?: boolean
}

export interface IForumTopic {
  topicTitle: string
  topicTag: string
  badgeColor: string
  messages: IForumTopicMessage[]
}

export interface IForumMessagesState {
  initialLoading: boolean
  isError: boolean
  messages: IForumTopicMessage[]
  messagesShift: number
  totalElements: number
}
