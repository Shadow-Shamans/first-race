import { useEffect, useRef } from 'react'
import { Game } from '@/game/arkanoid'
import { Layout } from 'antd'

import styles from './GameArkanoid.module.css'

export const GameFeature = () => {
  const gameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gameRef.current) {
      new Game(gameRef.current)
    }
  }, [])

  return (
    <Layout>
      <div ref={gameRef} className={styles.gameContainer}></div>
    </Layout>
  )
}
