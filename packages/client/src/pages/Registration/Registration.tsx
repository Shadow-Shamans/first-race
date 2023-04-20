import { FC, useEffect } from 'react'
import { Button, Form } from 'antd'
import { LinkToPage } from '@/components/LinkToPage'
import { FormInput } from '@/components/FormInput'
import { generateId } from '@/shared/utils/generateId'
import styled from './Registration.module.css'
import {
  useLazyGetUserDataQuery,
  useSignupMutation,
} from '@/shared/services/AuthService'
import { useAppDispatch } from '@/app/hooks'
import { setUserData } from '@/features/User/userSlice'
import { toogleAuth } from '@/features/Auth/authSlice'
import { useNavigate } from 'react-router-dom'

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
  const [trigger, result] = useLazyGetUserDataQuery()

  const handleCheck = async () => {
    try {
      const values = await form.validateFields()

      if (!values.errorFields) {
        signup(values)
      }
    } catch (errorInfo) {
      console.log(errorInfo)
    }
  }

  //TODO
  //Может вызывать дополнительные рендеры за счет объекта mutationResult в зависимости useEffect
  useEffect(() => {
    if (mutationResult.isSuccess === true) {
      trigger()
    }
  }, [mutationResult])

  useEffect(() => {
    if (result.data) {
      appDispatch(setUserData(result.data))
      appDispatch(toogleAuth(true))
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
    </div>
  )
}
