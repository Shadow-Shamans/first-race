export interface IForumTopicMessage {
  userId: string
  avatar: string
  content: string
  date: string
}

export interface IForumTopic {
  topicTitle: string
  topicTag: string
  messages: IForumTopicMessage[]
}
