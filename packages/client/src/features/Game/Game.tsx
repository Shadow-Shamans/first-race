import { useEffect, useRef } from 'react'
import { Game } from '@/game/arkanoid'
import { Layout } from 'antd'

import styles from './GameArkanoid.module.css'
import { StateGame } from '@/game/arkanoid/types'
import { useAddScoreMutation } from '@/shared/services/LeaderboardService'
import { selectUserData } from '@/features/User/selectors'
import { useAppSelector } from '@/app'

export const GameFeature = () => {
  const gameRef = useRef<HTMLDivElement>(null)
  const [addScore] = useAddScoreMutation()
  const { id: userId, login: username } = useAppSelector(selectUserData)

  const handleStateChange = (state: StateGame, score?: number) => {
    if (state === 'win' && score && username && userId) {
      addScore({ score, username, userId })
    }
  }

  useEffect(() => {
    if (gameRef.current) {
      new Game(gameRef.current, handleStateChange)
    }
  }, [])

  return (
    <Layout>
      <div ref={gameRef} className={styles.gameContainer}></div>
    </Layout>
  )
}
