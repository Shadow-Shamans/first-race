import { IForumItem } from '@/pages/Forum/types'

export interface IForumState {
  data: IForumItem[]
  initialLoading: boolean
  isError: boolean
  currentPage: number
  totalElement: number
}
