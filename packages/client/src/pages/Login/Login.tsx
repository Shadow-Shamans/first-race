import { FC } from 'react'
import { Button, Form } from 'antd'
import { LayoutFullPage } from '@/components/LayoutFullPage'
import { LinkToPage } from '@/components/LinkToPage'
import { FormInput } from '@/components/FormInput'
import { generateId } from '@/shared/utils/generateId'

const LoginInputs = [
  {
    label: 'Логин',
    name: 'login',
  },
  {
    label: 'Пароль',
    name: 'password',
  },
]

export const Login: FC = () => {
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
          {LoginInputs.map(({ label, name }) => {
            return (
              <FormInput
                label={label}
                name={name}
                key={generateId()}></FormInput>
            )
          })}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" onClick={onCheck}>
              Войти
            </Button>
          </Form.Item>
        </Form>
        <LinkToPage text="Нет аккаунта?" to="/registration" />
      </div>
    </LayoutFullPage>
  )
}
