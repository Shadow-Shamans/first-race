import { FC, useEffect, useState } from 'react'
import { List, message } from 'antd'
import { useForum } from '@/shared/hooks/useForum'
import { TopicItem } from './components/TopicItem'
import {
  IForumItem,
  useCreateTopicMutation,
} from '@/shared/services/ForumService'
import { useAppSelector } from '@/app'
import { selectUserData } from '@/features/User'
import { ForumModal } from '@/components/ForumModal'
import { IModalData } from '../ForumModal/ForumModal'
import { ISortOption, sortByNew } from '@/shared/utils/dateTime'
import { Controls } from '@/components/TopicList/components/Controls'
import { TFilterOption, TSortOption } from './components/Controls/Controls'

import styles from './TopicList.module.css'

export const TopicList: FC = () => {
  const { id: userId } = useAppSelector(selectUserData)

  const [messageApi, contextHolder] = message.useMessage()

  const {
    topics,
    isLoading: isTopicsLoading,
    refreshTopics,
    setTopics,
    filteredTopics,
    filterTopics,
  } = useForum()

  const [isModalOpened, setIsModalOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [createTopic, mutationResult] = useCreateTopicMutation()

  const handleOpenModal = () => setIsModalOpened(true)

  const handleCloseModal = () => setIsModalOpened(false)

  const handleCreateTopic = (data: IModalData) => {
    setIsLoading(true)

    if (!userId) {
      messageApi.open({
        type: 'error',
        content: `Текущий пользователь не определен`,
      })

      return
    }

    const { title, description } = data

    createTopic({
      title,
      description,
      userId: userId.toString(),
    })

    setIsModalOpened(false)
  }

  const handleSort = (value: TSortOption) => {
    const sortedByNew = sortByNew(topics as ISortOption[])

    if (value === 'new') {
      setTopics(sortedByNew as IForumItem[])
    } else {
      setTopics(sortedByNew.reverse() as IForumItem[])
    }
  }

  const handleFilter = (value: TFilterOption[]) => {
    filterTopics(value)
  }

  useEffect(() => {
    if (mutationResult.status === 'fulfilled' && mutationResult.data) {
      const title = mutationResult.data.data.title

      messageApi.open({
        type: 'success',
        content: `Новая тема "${title}" успешно создана`,
      })

      refreshTopics()
    }

    if (mutationResult.status === 'rejected') {
      messageApi.open({
        type: 'error',
        content: `Ошибка при создании темы`,
      })
    }

    setIsLoading(false)
    setIsModalOpened(false)
  }, [mutationResult])

  useEffect(() => {
    refreshTopics()
  }, [])

  return (
    <div className={styles.root}>
      <Controls
        onCreateTopic={handleOpenModal}
        onSortTopics={handleSort}
        onFilterTopics={handleFilter}
      />

      <List
        bordered
        loading={isTopicsLoading}
        itemLayout="horizontal"
        dataSource={filteredTopics}
        renderItem={item => <TopicItem topic={item} />}
      />

      {isModalOpened && (
        <ForumModal
          isLoading={isLoading}
          title={'Новая тема'}
          onSubmit={handleCreateTopic}
          onCancel={handleCloseModal}
        />
      )}

      {contextHolder}
    </div>
  )
}
