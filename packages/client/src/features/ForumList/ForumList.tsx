import { FC, useState, useEffect, useCallback } from 'react'
import { Button, List } from 'antd'
import { IForumItem } from '@/pages/Forum/types'
import { IForumState } from './types'
import {
  ITEMS_PER_LOAD,
  emptyObject,
  initialForumState,
  loadMoreBtnSx,
} from './constants'
import { forumTempData } from '@/pages/Forum/mockData'
import ForumTopicItem from '../ForumTopicItem'
import styles from './ForumList.module.css'

export const ForumList: FC = () => {
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

  const loadMore =
    !forumState.initialLoading && !loadingItem ? (
      <div className={styles.loadMoreBtn}>
        <Button
          style={loadMoreBtnSx}
          onClick={handleLoadMore}
          disabled={list.length === forumTempData.length}>
          {list.length === forumTempData.length
            ? 'Тем больше нет'
            : 'Загрузить еще 5 тем'}
        </Button>
      </div>
    ) : null

  return (
    <List
      className={styles.loadmoreList}
      loading={forumState.initialLoading}
      itemLayout="horizontal"
      size="small"
      loadMore={loadMore}
      dataSource={list}
      renderItem={item => (
        <ForumTopicItem item={item} isLoading={item.isLoading as boolean} />
      )}
    />
  )
}
