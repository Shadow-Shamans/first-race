import { IForumItem } from '@/pages/Forum/types'
import { useCallback, useEffect, useState } from 'react'
import { ITEMS_PER_LOAD, emptyObject, initialForumState } from './constants'
import { IForumState } from './types'
import { forumTempData } from '@/pages/Forum/mockData'

export const useForum = () => {
  const [forumState, setForumState] = useState<IForumState>(initialForumState)
  const [list, setList] = useState<IForumItem[]>([])
  const [loadingItem, setLoadingItem] = useState<boolean>(false)

  useEffect(() => {
    setForumState(prev => ({ ...prev, initialLoading: true }))
    // TODO убрать таймер и заменить реальным рестом
    setTimeout(() => {
      setForumState(prev => ({
        ...prev,
        data: forumTempData.slice(0, ITEMS_PER_LOAD),
        initialLoading: false,
        currentPage: prev.currentPage + ITEMS_PER_LOAD,
      }))
      setList(forumTempData.slice(0, ITEMS_PER_LOAD))
    }, 1000)
  }, [])

  const handleLoadMore = useCallback(() => {
    const { data, currentPage } = forumState
    setLoadingItem(true)
    setList(
      data.concat(
        [...new Array(ITEMS_PER_LOAD)].map(() => ({
          isLoading: true,
          ...emptyObject,
        }))
      )
    )
    // TODO убрать таймер и заменить реальным рестом
    setTimeout(() => {
      setForumState(prev => ({
        ...prev,
        data: prev.data.concat(
          forumTempData.slice(
            prev.currentPage,
            prev.currentPage + ITEMS_PER_LOAD
          )
        ),
        currentPage: prev.currentPage + 5,
      }))
      setList(
        data.concat(
          forumTempData.slice(currentPage, currentPage + ITEMS_PER_LOAD)
        )
      )
      setLoadingItem(false)
    }, 1000)
  }, [forumState, list])

  return {
    list,
    forumState,
    loadingItem,
    handleLoadMore,
  }
}
