import { FC, useState } from 'react'
import { Input, Modal } from 'antd'

import styles from './ForumModal.module.css'

export interface IModalData {
  title: string
  description: string
}

interface IProps {
  isOpened: boolean
  isLoading: boolean
  title: string
  initialData?: IModalData
  onSubmit: (data: IModalData) => void
  onCancel: (data: IModalData) => void
}

export const ForumModal: FC<IProps> = ({
  isOpened,
  isLoading,
  title,
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [topicTitle, setTopicTitle] = useState(initialData?.title ?? '')
  const [topicDescription, setTopicDescription] = useState(
    initialData?.description ?? ''
  )

  const handleSubmit = () => {
    onSubmit({ title: topicTitle, description: topicDescription })
    clearFields()
  }

  const handleCancel = () => {
    onCancel({ title: topicTitle, description: topicDescription })
    clearFields()
  }

  const clearFields = () => {
    setTopicTitle('')
    setTopicDescription('')
  }

  return (
    <Modal
      title={title}
      open={isOpened}
      confirmLoading={isLoading}
      onOk={handleSubmit}
      onCancel={handleCancel}>
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
  )
}
