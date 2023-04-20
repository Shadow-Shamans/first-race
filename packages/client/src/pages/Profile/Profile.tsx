import React, { FC } from 'react'
import { Form, Avatar, Divider, Upload, Button, Row, Col, Card } from 'antd'
import { Rating } from '@/components/Rating'
import { LinkToPage } from '@/components/LinkToPage'
import { PlusOutlined } from '@ant-design/icons'
import { FormInput } from '@/components/FormInput'

import styled from './Profile.module.css'

import { leaderBoardMock } from '@/mocks/ratingMock'
import { generateId } from '@/shared/utils/generateId'
import { selectUserData } from '@/features/User/selectors'
import { useAppDispatch, useAppSelector } from '@/app'
import { useUpdateUserProfileMutation } from '@/shared/services/AuthService'
import { IUser, setUserData } from '@/features/User/userSlice'

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
  const imageUrl = null
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

  //Что-то я туплю - как это по нормальному сделать?
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

  return (
    <div className={styled.wrapper}>
      <Row justify="space-between">
        <Col span={11}>
          <Card className={styled.card}>
            <Upload
              name="avatar"
              listType="picture-circle"
              showUploadList={{
                showDownloadIcon: true,
              }}
              className={styled.avatar}>
              {imageUrl ? (
                <Avatar src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                <>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Загрузить аватар</div>
                </>
              )}
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
            <Rating list={leaderBoardMock} currentUserId={1} />
          </Card>
          <Card className={styled.card}>
            Пройденные уровни: 2
            <Divider />
            Количество монет: 120
            <Divider />
            Количество очков: 2000
          </Card>
          <Card className={styled.card}>
            {/* TODO Replace real action of logout and shop */}
            <LinkToPage text="Магазин" to="#" />
            <LinkToPage text="Выйти" to="#" />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
