import { FC, useEffect } from 'react'
import { useAppSelector } from '@/app'

import type { GameElement } from '@/game'

import { selectCoins, selectScore, selectTimeNumber } from './selectors'
import { GameIcon } from './GameIcon'
import styles from './GamePanel.module.css'
import { formatTime } from './utils'

interface IProps {
  game: GameElement | null
}

export const GamePanel: FC<IProps> = props => {
  const { game } = props
  const score = useAppSelector(selectScore)
  const coins = useAppSelector(selectCoins)
  const timeNumber = useAppSelector(selectTimeNumber)
  const bonus = 1
  const time = formatTime(timeNumber)

  useEffect(() => {
    if (game) {
      game.score = score
      game.coins = coins
    }
  }, [game])

  if (!game) {
    return null
  }

  return (
    <div className={styles.container}>
      <span className={styles.item}>
        <GameIcon name="king" />
        {bonus}
      </span>
      <span className={styles.item}>
        <GameIcon name="chronometer" />
        {time}
      </span>
      <span className={styles.item}>
        <GameIcon name="score" />
        {score}
      </span>
      <span className={styles.item}>
        <GameIcon name="coin" />
        {coins}
      </span>
    </div>
  )
}
