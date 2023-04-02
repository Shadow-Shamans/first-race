import { FC } from 'react'
import { Card, Typography } from 'antd'
import { classNames } from '@/shared/utils/classNames'
import { Rating } from '@/components/Rating'

import coins from '@/assets/images/coins.png'
import mainCards from '@/assets/images/mainCards.png'
import mainRoads from '@/assets/images/mainRoads.png'

import grayRectangle from '@/assets/icons/grayRectangle.svg'
import blackRectangle from '@/assets/icons/blackRectangle.svg'

import { leaderBoardMock } from '@/mocks/ratingMock'

import styles from './main.module.css'

const { Text } = Typography

export const Main: FC = () => {
  return (
    <section className={styles.root}>
      <Text className={classNames(styles.title, styles.leftTopTitle)}>
        Управляй!
      </Text>

      <div className={styles.picturesWrapper}>
        <div>
          <img
            className={classNames(styles.rectangle, styles.bottomRectangle)}
            src={grayRectangle}
            alt=""
          />
          <img
            className={classNames(styles.rectangle, styles.topRectangle)}
            src={blackRectangle}
            alt=""
          />

          <Text strong className={classNames(styles.text, styles.textWrapper)}>
            Мы с командой Shadow Shamans взяли и сделали офигенную игру! Теперь{' '}
            <Text mark className={styles.text}>
              твоя очередь действовать!
            </Text>
          </Text>
        </div>

        <img
          className={classNames(styles.picture, styles.left)}
          src={mainRoads}
          alt="game roads"
        />

        <Text className={classNames(styles.title, styles.rightTitle)}>
          Строй!
        </Text>

        <img className={styles.coins} src={coins} alt="coins" />

        <img
          className={classNames(styles.picture, styles.right)}
          src={mainCards}
          alt="game cards"
        />

        <Text className={classNames(styles.title, styles.leftBottomTitle)}>
          Зарабатывай!
        </Text>
      </div>

      <div className={styles.leaderBoard}>
        <Text className={styles.title}>Попади в топ!</Text>

        <Card className={styles.card}>
          <Rating currentUserId={1} list={leaderBoardMock} />
        </Card>
      </div>
    </section>
  )
}
