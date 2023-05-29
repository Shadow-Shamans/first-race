export interface ITopic {
  id: number
  title: string
  description: string
  userId: string
  messageCount: number
}

export interface ICreateTopic {
  title: string
  description: string
  userId: string
}
export interface IUpdateTopic {
  title: string
  description: string
  id: string
}

export interface IComment {
  id: number
  content: string
  userId: string
}

export interface ICreateComment {
  title: string
  description: string
  userId: string
}
