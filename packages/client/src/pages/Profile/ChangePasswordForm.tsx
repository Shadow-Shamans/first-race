import { useUpdateUserPasswordMutation } from '@/shared/services/AuthService'
import { TPasswordChangeDTO } from '@/shared/services/types'
import { Form, Input, Typography, Button } from 'antd'

const { Title } = Typography

export const ChangePasswordForm = () => {
  const [updatePassword, updatePasswordMutationResult] =
    useUpdateUserPasswordMutation()

  const onFinish = (values: TPasswordChangeDTO) => {
    updatePassword(values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Title level={5}>Смена пароля</Title>

      <Form.Item
        label="Старый пароль"
        name="oldPassword"
        rules={[{ required: true, message: 'Введите старый пароль' }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Новый пароль"
        name="newPassword"
        rules={[{ required: true, message: 'Введите новы пароль' }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Сменить
        </Button>
      </Form.Item>
    </Form>
  )
}
