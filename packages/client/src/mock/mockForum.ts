import { generateId } from '@/shared/utils/generateId'
import { IForumMessage } from '@/pages/ForumTopic/types'

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
