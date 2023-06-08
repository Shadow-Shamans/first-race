import React, { FC } from 'react'
import { Button, Card, Divider, List, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { IForumComment } from '@/shared/services/ForumService'
import { useAppSelector } from '@/app'
import { selectUserData } from '@/features/User'
import { convertDateTime } from '@/shared/utils/dateTime'
import { ForumMessages } from '@/components/ForumMessages'

import styles from './ForumMessage.module.css'

interface IProps {
  comment: IForumComment
  onDelete: (id: string) => void
}

export const ForumMessage: FC<IProps> = ({ comment, onDelete }) => {
  const [date, time] = convertDateTime(comment.createdAt)

  const { id: userId } = useAppSelector(selectUserData)
  const isCurrentUser = userId === comment.userId

  const handleDelete = () => {
    onDelete(comment.id)
  }

  return (
    <List.Item>
      <Card className={styles.block}>
        <div className={styles.content}>
          <p>{comment.content}</p>

          <div>
            <Typography.Text className={styles.date}>{time}</Typography.Text>

            <Typography.Text type="secondary" className={styles.date}>
              {date}
            </Typography.Text>

            {isCurrentUser && (
              <Button type="primary" danger size="small" onClick={handleDelete}>
                <DeleteOutlined rev={undefined} />
              </Button>
            )}
          </div>
        </div>

        <ForumMessages parentId={comment.id} />
      </Card>
    </List.Item>
  )
}
