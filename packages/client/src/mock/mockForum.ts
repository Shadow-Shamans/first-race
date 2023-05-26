import { generateId } from '@/shared/utils/generateId'
import { IForumMessage } from '@/pages/ForumTopic/types'
import { IForumItem } from '../pages/Forum/types'

export const topicsMock: IForumItem[] = [
  {
    id: generateId(),
    title: 'Топик 1',
    messageCount: 12,
    createdDate: '123',
  },
  {
    id: generateId(),
    title: 'Топик 2',
    messageCount: 0,
    createdDate: '907822',
  },
  {
    id: generateId(),
    title: 'Топик 3',
    messageCount: 1200,
    createdDate: '907822',
  },
  {
    id: generateId(),
    title: 'Топик 4',
    messageCount: 3,
    createdDate: '907822',
  },
]

export const messagesMock: IForumMessage[] = [
  {
    id: generateId(),
    content: 'Message 1',
    replyCount: 2,
    createdDate: '123',
  },
  {
    id: generateId(),
    content: 'Message 2 Message 2 Message 2 Message 2 Message 2 Message 2',
    replyCount: 0,
    createdDate: '123',
  },
  {
    id: generateId(),
    content: 'Message 3',
    replyCount: 20,
    createdDate: '123',
  },
  {
    id: generateId(),
    content: 'Message 4',
    replyCount: 0,
    createdDate: '123',
  },
]
