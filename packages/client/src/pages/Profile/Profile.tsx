import { Row, Col, Card, Space } from 'antd'

import styled from './Profile.module.css'

import { ProfileStatistic } from './ProfileStatistic'
import { Logout } from './Logout'
import { Settings } from './Settings'
import { ProfileAvatar } from './ProfileAvatar'
import { ProfileFields } from './ProfileFields'

export const Profile = () => {
  return (
    <div className={styled.wrapper}>
      <Row justify="space-between">
        <Col span={11}>
          <Card className={styled.card}>
            <ProfileAvatar />
            <ProfileFields />
          </Card>
        </Col>
        <Col span={11}>
          <ProfileStatistic />
          <Card className={styled.card}>
            <Space>
              <Logout />
              <Settings />
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
