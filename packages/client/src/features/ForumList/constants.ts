import { IForumItem } from '@/pages/Forum/types'
import { IForumState } from './types'

export const initialForumState: IForumState = {
  isError: false,
  initialLoading: false,
  data: [],
  currentPage: 0,
  totalElement: 21,
}

export const loadMoreBtnSx = {
  fontSize: '16px',
  fontWeight: 700,
  background: 'none',
  border: 'none',
  boxShadow: 'none',
}

export const ITEMS_PER_LOAD = 5

export const emptyObject: IForumItem = {
  id: '',
  title: '',
  lastMessage: '',
  topic: '',
  totalMessages: 0,
  userAvatar: '',
  badgeColor: '',
}
