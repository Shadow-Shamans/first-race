export interface IForumItem {
  id: string
  title: string
  lastMessage: string
  topic: string
  totalMessages: number
  userAvatar: string
  badgeColor: string
}

export interface IForumState {
  data: IForumItem[]
  isLoading: boolean
  isError: boolean
}
