import { FC } from 'react'
import { Button, Form } from 'antd'
import { LayoutFullPage } from '@/components/LayoutFullPage'
import { LinkToPage } from '@/components/LinkToPage'
import { FormInput } from '@/components/FormInput'
import { generateId } from '@/shared/utils/generateId'
import styled from './Login.module.css'

const LoginInputs = [
  {
    placeholder: 'Логин',
    name: 'login',
  },
  {
    placeholder: 'Пароль',
    name: 'password',
  },
]

export const Login: FC = () => {
  const [form] = Form.useForm()

  const handleCheck = async () => {
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
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        size="large"
        className={styled.form}>
        {LoginInputs.map(({ placeholder, name }) => {
          return (
            <FormInput
              placeholder={placeholder}
              name={name}
              key={generateId()}></FormInput>
          )
        })}
        <Form.Item>
          <Button
            type="primary"
            onClick={handleCheck}
            className={styled.button}>
            Войти
          </Button>
          <LinkToPage text="Нет аккаунта?" to="/registration" />
        </Form.Item>
      </Form>
    </LayoutFullPage>
  )
}
