import { FC, useState } from 'react'
import { Button, List, Modal, message, Input } from 'antd'
import { useForum } from '@/shared/hooks/useForum'
import ForumTopicItem from './components/TopicItem'

import styles from './ForumList.module.css'

export const TopicList: FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const { topics, isLoading: isTopicsLoading } = useForum()

  const [isModalOpened, setIsModalOpened] = useState(false)
  const [modalValue, setModalValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenModal = () => setIsModalOpened(true)

  const handleCloseModal = () => setIsModalOpened(false)

  const handleCreateTopic = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setIsModalOpened(false)

      messageApi.open({
        type: 'success',
        content: `Новая тема "${modalValue}" успешно создана`,
      })
    }, 1000)
  }

  return (
    <>
      <Button className={styles.link} onClick={handleOpenModal}>
        Добавить новую тему
      </Button>

      <List
        loading={isTopicsLoading}
        itemLayout="horizontal"
        dataSource={topics}
        renderItem={item => <ForumTopicItem item={item} />}
      />

      <Modal
        title="Создать новую тему"
        open={isModalOpened}
        confirmLoading={isLoading}
        onOk={handleCreateTopic}
        onCancel={handleCloseModal}>
        <Input
          placeholder="Название темы"
          value={modalValue}
          onChange={event => setModalValue(event.target.value)}
        />
      </Modal>

      {contextHolder}
    </>
  )
}
