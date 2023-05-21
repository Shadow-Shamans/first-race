import { useEffect, useRef } from 'react'
import { Game } from '@/game/arkanoid'
import { Layout } from 'antd'

import styles from './GameArkanoid.module.css'
import { StateGame } from '@/game/arkanoid/types'

export const GameFeature = () => {
  const gameRef = useRef<HTMLDivElement>(null)

  const handleStateChange = (state: StateGame, score?: number) => {
    if (state === 'win') {
      console.log({ state, score })
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
