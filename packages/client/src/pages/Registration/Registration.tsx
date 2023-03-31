import { FC } from 'react'
import { Button, Form, Input } from 'antd'
import { LayoutFullPage } from '@/components/LayoutFullPage'
import { LinkToPage } from '@/components/LinkToPage'
import validateForms from '@/shared/utils/validateForms'

export const Registration: FC = () => {
  const [form] = Form.useForm()

  const onCheck = async () => {
    try {
      const values = await form.validateFields()

      if (!values.errorFields) {
        console.log(values)
      }
    } catch (errorInfo) {
      console.log(errorInfo)
    }
  }

  return (
    <LayoutFullPage>
      <div>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 420 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          size="large">
          <Form.Item
            name="name"
            label="Имя"
            rules={[
              {
                required: true,
                message: 'Поле имени не может быть пустым!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return validateForms(getFieldValue, 'name', value)
                },
              }),
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              {
                required: true,
                message: 'Поле пароля не может быть пустым!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return validateForms(getFieldValue, 'password', value)
                },
              }),
            ]}>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" onClick={onCheck}>
              Регистрация
            </Button>
          </Form.Item>
        </Form>
        <LinkToPage text="Нет аккаунта?" to="/registration" />
      </div>
    </LayoutFullPage>
  )
}
