import { useState } from 'react'
import { Button, Modal } from 'antd'
import { SettingFilled } from '@ant-design/icons'
import { ChangePasswordForm } from './ChangePasswordForm'

export const Settings = () => {
  const [open, setOpen] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      <Button icon={<SettingFilled />} onClick={showModal}>
        Настройки
      </Button>
      <Modal open={open} onOk={handleOk} onCancel={handleCancel} footer={[]}>
        <ChangePasswordForm />
      </Modal>
    </>
  )
}
