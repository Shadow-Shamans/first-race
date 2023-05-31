import { FC, useEffect, useState } from 'react'
import { Input, Modal } from 'antd'

import styles from './ForumModal.module.css'
import { useTopic } from '../../shared/hooks/useTopic'

export interface IModalData {
  title: string
  description: string
}

interface IProps {
  isLoading?: boolean
  title: string
  initialData?: IModalData
  onSubmit: (data: IModalData) => void
  onCancel: (data: IModalData) => void
}

export const ForumModal: FC<IProps> = ({
  isLoading = false,
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
    if (!topicTitle || !topicDescription) return

    onSubmit({ title: topicTitle, description: topicDescription })
    clearFields()
  }

  const handleCancel = () => {
    onCancel({ title: topicTitle, description: topicDescription })
  }

  const clearFields = () => {
    setTopicTitle('')
    setTopicDescription('')
  }

  return (
    <Modal
      open
      title={title}
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
