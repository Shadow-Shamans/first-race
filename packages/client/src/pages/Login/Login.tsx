import { FC } from 'react'
import { Button, Form, Input } from 'antd'
import { LayoutFullPage } from '@/components/LayoutFullPage'
import { LinkToPage } from '@/components/LinkToPage'

export const Login: FC = () => {
  const onSuccessSubmit = (values: any) => {
    // Вызвать кастомный хук для отправки данных post на создание пользователя и получения токена
    // {
    //   login: String,
    //   password: String,
    // }
    console.log('Data:', values)
  }

  const onErrorSubmit = (errorInfo: any) => {
    console.error('Failed:', errorInfo)
  }

  return (
    <LayoutFullPage>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 420 }}
          initialValues={{ remember: true }}
          onFinish={onSuccessSubmit}
          onFinishFailed={onErrorSubmit}
          autoComplete="off"
          size="large">
          <Form.Item
            label="Логин"
            name="login"
            rules={[
              { required: true, message: 'Поле логина не может быть пустым!' },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: 'Поле пароля не может быть пустым!' },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
        <LinkToPage text="Нет аккаунта?" to="/registration" />
      </div>
    </LayoutFullPage>
  )
}
