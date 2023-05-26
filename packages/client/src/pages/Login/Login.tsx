import { FC, useEffect } from 'react'
import { Button, Form } from 'antd'
import { LinkToPage } from '@/components/LinkToPage'
import { FormInput } from '@/components/FormInput'
import { generateId } from '@/shared/utils/generateId'
import styled from './Login.module.css'
import { useSigninMutation } from '@/shared/services/AuthService'
import { useAppDispatch } from '@/app/hooks'
import { useNavigate } from 'react-router-dom'
import { toogleAuth } from '@/features/Auth/authSlice'
import { YandexOAuth } from '@/components/YandexOAuth'

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
  const appDispatch = useAppDispatch()
  const [form] = Form.useForm()
  const [signin, mutationResult] = useSigninMutation()
  const navigate = useNavigate()

  const handleCheck = async () => {
    try {
      const values = await form.validateFields()

      if (!values.errorFields) {
        signin(values)
      }
    } catch (errorInfo) {
      console.error(errorInfo)
    }
  }

  useEffect(() => {
    if (mutationResult.status === 'rejected') {
      appDispatch(toogleAuth(true))
      navigate('/main')
    }
  }, [mutationResult])

  return (
    <div className={styled.inner}>
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
            data-testid="button"
            className={styled.button}>
            Войти
          </Button>
          <LinkToPage text="Нет аккаунта?" to="/registration" />
        </Form.Item>
      </Form>
      <YandexOAuth />
    </div>
  )
}
