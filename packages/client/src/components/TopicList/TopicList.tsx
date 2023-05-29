import { FC, useEffect, useState } from 'react'
import { Button, List, Modal, message, Input } from 'antd'
import { useForum } from '@/shared/hooks/useForum'
import { TopicItem } from './components/TopicItem'
import { useCreateTopicMutation } from '@/shared/services/ForumService'
import { useAppSelector } from '@/app'
import { selectUserData } from '@/features/User'

import styles from './TopicList.module.css'

export const TopicList: FC = () => {
  const { id: userId } = useAppSelector(selectUserData)

  const [messageApi, contextHolder] = message.useMessage()

  const { topics, isLoading: isTopicsLoading, refreshTopics } = useForum()

  const [isModalOpened, setIsModalOpened] = useState(false)
  const [topicTitle, setTopicTitle] = useState('')
  const [topicDescription, setTopicDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [createTopic, mutationResult] = useCreateTopicMutation()

  const handleOpenModal = () => setIsModalOpened(true)

  const handleCloseModal = () => setIsModalOpened(false)

  const handleCreateTopic = () => {
    setIsLoading(true)

    if (!userId) {
      messageApi.open({
        type: 'error',
        content: `Текущий пользователь не определен`,
      })

      return
    }

    createTopic({
      title: topicTitle,
      description: topicDescription,
      userId: userId.toString(),
    })
  }

  useEffect(() => {
    if (mutationResult.status === 'fulfilled') {
      messageApi.open({
        type: 'success',
        content: `Новая тема "${topicTitle}" успешно создана`,
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
        renderItem={item => <TopicItem topic={item} isLoading={isLoading} />}
      />

      <Modal
        title="Создать новую тему"
        open={isModalOpened}
        confirmLoading={isLoading}
        onOk={handleCreateTopic}
        onCancel={handleCloseModal}>
        <Input
          placeholder="Название темы"
          value={topicTitle}
          className={styles.input}
          onChange={event => setTopicTitle(event.target.value)}
        />

        <Input.TextArea
          value={topicDescription}
          onChange={event => setTopicDescription(event.target.value)}
          placeholder="Описание"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Modal>

      {contextHolder}
    </div>
  )
}
