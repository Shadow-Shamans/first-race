import { FC } from 'react'
import { Form, Avatar, Divider, Upload, Button, Row, Col, Card } from 'antd'
import { Rating } from '@/components/Rating'
import { LinkToPage } from '@/components/LinkToPage'
import { PlusOutlined } from '@ant-design/icons'
import { FormInput } from '@/components/FormInput'

import styled from './Profile.module.css'

import { leaderBoardMock } from '@/mocks/ratingMock'

const Fields = [
  {
    placeholder: 'Имя',
    name: 'name',
    editable: true,
  },
  {
    placeholder: 'Фамилия',
    name: 'last_name',
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
  {
    placeholder: 'Пароль',
    name: 'password',
    editable: true,
  },
]

export const Profile: FC = () => {
  const imageUrl = null
  const [form] = Form.useForm()

  const handleFormChange = async () => {
    try {
      const values = await form.validateFields()

      if (!values.errorFields) {
        // TODO: Add form error handler
      }
    } catch (errorInfo) {
      // TODO: Add form error handler
    }
  }

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
              {Fields.map(({ placeholder, name }) => {
                return <FormInput name={name} placeholder={placeholder} />
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
