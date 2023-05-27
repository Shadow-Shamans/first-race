import React, { FC } from 'react'
import { Form, Avatar, Divider, Upload, Button, Row, Col, Card } from 'antd'
import { Rating } from '@/components/Rating'
import placeholderAvatar from '@/assets/placeholder_avatar.svg'
import { FormInput } from '@/components/FormInput'

import styled from './Profile.module.css'

import { generateId } from '@/shared/utils/generateId'
import { selectUserData } from '@/features/User/selectors'
import { useAppDispatch, useAppSelector } from '@/app'
import {
  useLogoutMutation,
  useUpdateUserProfileMutation,
} from '@/shared/services/AuthService'
import { IUser, setUserData } from '@/features/User/userSlice'
import { toogleAuth, toggleCode } from '@/features/Auth/authSlice'
import { useRating } from '@/shared/hooks/useRating'
import { useEffect } from 'react'
import { useUploadImg } from '@/shared/hooks'

const Fields = [
  {
    placeholder: 'Имя',
    name: 'first_name',
    editable: true,
  },
  {
    placeholder: 'Фамилия',
    name: 'second_name',
    editable: true,
  },
  {
    placeholder: 'Email',
    name: 'email',
    editable: true,
  },
  {
    placeholder: 'Телефон',
    name: 'phone',
    editable: true,
  },
  {
    placeholder: 'Логин',
    name: 'login',
    editable: true,
  },
]

type TProfileData = {
  name: string
  placeholder: string
  value: string
  editable: boolean
}

export const Profile: FC = () => {
  const appDispatch = useAppDispatch()
  const [form] = Form.useForm()
  const { userList } = useRating()
  const data = useAppSelector(selectUserData)
  const [updateUserProfile, mutationResult] = useUpdateUserProfileMutation()
  const [logout, result] = useLogoutMutation()
  const {
    imageUrl: avatarImgUrl,
    handleChange,
    validateImage,
  } = useUploadImg(placeholderAvatar)

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

  React.useEffect(() => {
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
  }, [mutationResult])

  const handleLogout = () => {
    logout()
  }

  useEffect(() => {
    if (result.requestId) {
      appDispatch(toogleAuth(false))
      appDispatch(toggleCode(''))
      appDispatch(
        setUserData({
          ...data,
          ...{
            id: null,
            first_name: '',
            avatar: null,
            second_name: '',
            email: '',
            login: '',
            phone: '',
          },
        })
      )
    }
  }, [result])

  return (
    <div className={styled.wrapper}>
      <Row justify="space-between">
        <Col span={11}>
          <Card className={styled.card}>
            <Upload
              name="avatar"
              listType="picture-circle"
              showUploadList={false}
              beforeUpload={validateImage}
              onChange={handleChange}
              className={styled.avatar}>
              <Avatar
                src={avatarImgUrl}
                alt="avatar"
                className={styled.avatarImg}
              />
            </Upload>

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
          </Card>
        </Col>
        <Col span={11}>
          <Card className={styled.card}>
            <Rating list={userList.slice(0, 5)} currentUserId={1} />
          </Card>
          <Card className={styled.card}>
            Пройденные уровни: 2
            <Divider />
            Количество монет: 120
            <Divider />
            Количество очков: 2000
          </Card>
          <Card className={styled.card}>
            <div onClick={handleLogout} className={styled.logoutText}>
              Выйти
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
