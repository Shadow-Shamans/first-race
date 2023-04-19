import React, { FC } from 'react'
import { Button, Form } from 'antd'
import { LinkToPage } from '@/components/LinkToPage'
import { FormInput } from '@/components/FormInput'
import { generateId } from '@/shared/utils/generateId'
import styled from './Login.module.css'
import {
  useSigninMutation,
  useLazyGetUserDataQuery,
} from '@/shared/services/AuthService'
import { useAppDispatch } from '@/app/hooks'
import { useNavigate } from 'react-router-dom'
import { toogleAuth } from '@/features/Auth/authSlice'
import { setUserData } from '@/features/User'

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
  const [trigger, result] = useLazyGetUserDataQuery()

  const handleCheck = async () => {
    try {
      const values = await form.validateFields()

      if (!values.errorFields) {
        signin(values)
        appDispatch(toogleAuth(true))
      }
    } catch (errorInfo) {
      console.log(errorInfo)
    }
  }

  React.useEffect(() => {
    if (mutationResult.status === 'rejected') {
      trigger()
    }
  }, [mutationResult])

  React.useEffect(() => {
    if (result.data) {
      appDispatch(setUserData(result.data))
      navigate('/main')
    }
  }, [result])

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
            className={styled.button}>
            Войти
          </Button>
          <LinkToPage text="Нет аккаунта?" to="/registration" />
        </Form.Item>
      </Form>
    </div>
  )
}
