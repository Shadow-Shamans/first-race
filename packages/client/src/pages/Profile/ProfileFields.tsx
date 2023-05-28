import { FC, useEffect } from 'react'
import { Form, Button } from 'antd'
import { FormInput } from '@/components/FormInput'

import styled from './Profile.module.css'

import { generateId } from '@/shared/utils/generateId'
import { selectUserData } from '@/features/User/selectors'
import { useAppDispatch, useAppSelector } from '@/app'
import { useUpdateUserProfileMutation } from '@/shared/services/AuthService'
import { IUser, setUserData } from '@/features/User/userSlice'
import { Fields } from './data'

type TProfileData = {
  name: string
  placeholder: string
  value: string
  editable: boolean
}

export const ProfileFields: FC = () => {
  const appDispatch = useAppDispatch()
  const [form] = Form.useForm()
  const data = useAppSelector(selectUserData)
  const [updateUserProfile, mutationResult] = useUpdateUserProfileMutation()

  const handleFormChange = async () => {
    try {
      const values = await form.validateFields()

      if (!values.errorFields) {
        //display_name заглушка для Swagger
        updateUserProfile({ ...values, display_name: '' })
      }
    } catch (errorInfo) {
      console.error(errorInfo)
    }
  }

  const profileData: TProfileData[] = []

  Fields.some(el =>
    Object.entries(data).some(([key, value]) => {
      if (el.name === key) {
        profileData.push({ ...el, value: value })
      }
    })
  )

  useEffect(() => {
    if (mutationResult.isSuccess === true) {
      const newDate: IUser = {
        ...data,
        email: mutationResult.data.email,
        first_name: mutationResult.data.first_name,
        second_name: mutationResult.data.second_name,
        login: mutationResult.data.login,
        phone: mutationResult.data.phone,
      }
      appDispatch(setUserData(newDate))
    }
  }, [mutationResult.status])

  return (
    <Form form={form} name="profile" size="large">
      {profileData.map(({ placeholder, name, value }) => {
        return (
          <FormInput
            form={form}
            key={generateId()}
            name={name}
            placeholder={placeholder}
            value={value}
          />
        )
      })}
      <Form.Item>
        <Button
          type="primary"
          onClick={handleFormChange}
          className={styled.button}>
          Изменить данные
        </Button>
      </Form.Item>
    </Form>
  )
}
