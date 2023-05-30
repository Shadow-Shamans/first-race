import { FC, useEffect, useState } from 'react'
import { Button, List, message } from 'antd'
import { useForum } from '@/shared/hooks/useForum'
import { TopicItem } from './components/TopicItem'
import { useCreateTopicMutation } from '@/shared/services/ForumService'
import { useAppSelector } from '@/app'
import { selectUserData } from '@/features/User'
import { ForumModal } from '@/components/ForumModal'
import { IModalData } from '../ForumModal/ForumModal'

import styles from './TopicList.module.css'

export const TopicList: FC = () => {
  const { id: userId } = useAppSelector(selectUserData)

  const [messageApi, contextHolder] = message.useMessage()

  const { topics, isLoading: isTopicsLoading, refreshTopics } = useForum()

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

  return (
    <div className={styles.root}>
      <Button className={styles.link} onClick={handleOpenModal}>
        Добавить новую тему
      </Button>

      <List
        loading={isTopicsLoading}
        itemLayout="horizontal"
        dataSource={topics}
        renderItem={item => <TopicItem topic={item} />}
      />

      <ForumModal
        isOpened={isModalOpened}
        isLoading={isLoading}
        title={'Новая тема'}
        onSubmit={handleCreateTopic}
        onCancel={handleCloseModal}
      />

      {contextHolder}
    </div>
  )
}
