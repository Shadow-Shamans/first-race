import { Divider, Card } from 'antd'
import { Rating } from '@/components/Rating'

import styled from './Profile.module.css'
import { useRating } from '@/shared/hooks/useRating'

export const ProfileStatistic = () => {
  const { userList } = useRating()

  return (
    <>
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
    </>
  )
}
