import { FC } from 'react'
import { Button, Card, Divider, Input, List, Typography } from 'antd'
import { IForumMessage } from '@/pages/ForumTopic/types'

import styles from './ForumMessage.module.css'

interface IProps {
  message: IForumMessage
}

export const ForumMessage: FC<IProps> = ({ message }) => {
  return (
    <List.Item>
      <Card className={styles.block}>
        <div className={styles.content}>
          <p>{message.content}</p>

          <Typography.Text type="secondary">
            {message.createdDate}
          </Typography.Text>
        </div>

        <Divider />

        {message.replyCount > 0 && (
          <Button style={{ marginBottom: '16px' }} type="primary">
            Показать ответы
          </Button>
        )}

        <Input placeholder="Ответить" />
      </Card>
    </List.Item>
  )
}
