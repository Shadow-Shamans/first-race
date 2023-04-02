import { IForumState } from './types'

export const initialForumState: IForumState = {
  isError: false,
  isLoading: false,
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
