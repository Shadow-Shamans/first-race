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
  parentCommentId: string
  topicId: number
  emojiHappyFace?: number
  emojiSadFace?: number
  emojiAngryFace?: number
  emojiLike?: number
  emojiDislike?: number
}

export interface ICreateComment {
  title: string
  description: string
  userId: string
}

export interface IUser {
  roleId: number
}

export type TRoles = 'admin' | 'usual'

export interface IRole {
  name: TRoles
}
