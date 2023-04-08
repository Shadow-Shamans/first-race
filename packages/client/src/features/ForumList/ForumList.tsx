import { FC } from 'react'
import { Button, List } from 'antd'
import { Link } from 'react-router-dom'
import { forumTempData } from '@/pages/Forum/mockData'
import ForumTopicItem from '../ForumTopicItem'
import { useForum } from './useForum'
import { loadMoreBtnSx } from '@/assets/styles/buttons'
import styles from './ForumList.module.css'

export const ForumList: FC = () => {
  const { list, loadingItem, forumState, handleLoadMore } = useForum()

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
    <div>
      <Link to="/forum-create-new" className={styles.link}>
        <Button>Создать новый</Button>
      </Link>
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
    </div>
  )
}
