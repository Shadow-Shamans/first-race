import { FC, useState, useEffect } from 'react'
import { IForumState } from './types'
import { Layout, List, Button } from 'antd'
import { forumTempData } from './mockData'
import { initialForumState } from './constants'
import styles from './Forum.module.css'
import TopicItem from './TopicItem'

export const Forum: FC = () => {
  const [forumState, setForumState] = useState<IForumState>(initialForumState)

  useEffect(() => {
    setForumState(prev => ({
      ...prev,
      isLoading: true,
    }))
    setTimeout(() => {
      setForumState(prev => ({
        ...prev,
        data: forumTempData,
        isLoading: false,
      }))
    }, 2000)
  }, [])

  const onLoadMore = () => {
    setForumState(prev => ({
      ...prev,
      isLoading: true,
    }))
  }

  const loadMore = !forumState.isLoading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}>
      <Button onClick={onLoadMore}>Загрузить еще 5 тем</Button>
    </div>
  ) : null

  return (
    <Layout>
      <Layout.Content>
        <List
          className={styles.loadmoreList}
          loading={forumState.isLoading}
          itemLayout="horizontal"
          size="small"
          loadMore={loadMore}
          dataSource={forumState.data}
          renderItem={item => (
            <TopicItem item={item} isLoading={forumState.isLoading} />
          )}
        />
      </Layout.Content>
    </Layout>
  )
}
