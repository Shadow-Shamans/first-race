import { FC, useEffect } from 'react'
import { Button, Form } from 'antd'
import { LinkToPage } from '@/components/LinkToPage'
import { FormInput } from '@/components/FormInput'
import { generateId } from '@/shared/utils/generateId'
import styled from './Registration.module.css'
import { useSignupMutation } from '@/shared/services/AuthService'
import { useAppDispatch } from '@/app/hooks'
import { toogleAuth } from '@/features/Auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { YandexOAuth } from '@/components/YandexOAuth'

const RegistrationInputs = [
  {
    placeholder: 'Имя',
    name: 'first_name',
  },
  {
    placeholder: 'Фамилия',
    name: 'second_name',
  },
  {
    placeholder: 'Email',
    name: 'email',
  },
  {
    placeholder: 'Телефон',
    name: 'phone',
  },
  {
    placeholder: 'Логин',
    name: 'login',
  },
  {
    placeholder: 'Пароль',
    name: 'password',
  },
]

export const Registration: FC = () => {
  const appDispatch = useAppDispatch()
  const [form] = Form.useForm()
  const [signup, mutationResult] = useSignupMutation()
  const navigate = useNavigate()

  const handleCheck = async () => {
    try {
      const values = await form.validateFields()

      if (!values.errorFields) {
        signup(values)
      }
    } catch (errorInfo) {
      console.error(errorInfo)
    }
  }

  useEffect(() => {
    if (mutationResult.isSuccess === true) {
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
        {RegistrationInputs.map(({ placeholder, name }) => {
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
            Регистрация
          </Button>
          <LinkToPage text="Уже зарегистрированы?" to="/login" />
        </Form.Item>
      </Form>
      <YandexOAuth />
    </div>
  )
}
