export interface IForumItem {
  id: string
  title: string
  lastMessage: string
  topic: string
  totalMessages: number
  userAvatar: string
  badgeColor: string
  isLoading?: boolean
}
