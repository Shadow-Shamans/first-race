import { FC } from 'react'
import { Card, Typography } from 'antd'
import classNames from 'classnames'
import { Rating } from '@/components/Rating'
import { useRating } from '@/shared/hooks/useRating'

import rectangle from '@/assets/icons/rectangle.svg'
import productImg from '@/assets/images/product.png'
import joystick from '@/assets/images/joystick.png'

import styles from './main.module.css'

const { Text } = Typography

export const Main: FC = () => {
  const { userList } = useRating()
  return (
    <section className={styles.root}>
      <div className={styles.picturesWrapper}>
        <div className={styles.rectangleWrapper}>
          <img
            className={classNames(styles.rectangle)}
            src={rectangle}
            alt=""
          />

          <Text strong className={classNames(styles.text, styles.textWrapper)}>
            Мы&nbsp;с&nbsp;командой Shadow Shamans взяли и&nbsp;сделали
            офигенную игру!
            <br />
            Теперь{' '}
            <Text mark className={styles.text}>
              твоя очередь действовать!
            </Text>
          </Text>
        </div>

        <img
          className={classNames(styles.picture)}
          src={productImg}
          alt="game roads"
        />
      </div>

      <div className={styles.sloganWrapper}>
        <Text className={styles.title}>Настройся...</Text>
        <img
          className={classNames(styles.joystick)}
          src={joystick}
          alt="game roads"
        />
        <Text className={styles.title}>На&nbsp;победу!</Text>
      </div>

      <div className={styles.leaderBoard}>
        <Text className={styles.title}>Попади в&nbsp;топ!</Text>

        <Card className={styles.card}>
          <Rating list={userList.slice(0, 5)} />
        </Card>
      </div>
    </section>
  )
}
