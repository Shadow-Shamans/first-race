import { useAppDispatch } from '@/app'
import { GameElement } from '@/game'
import { Layout, Typography } from 'antd'

import { useEffect, useRef } from 'react'
import styles from './Game.module.css'
import { GameIcon } from './GameIcon'
import { GamePanel } from './GamePanel'
import { decrementTime } from './gameSlice'

export const GameFeature = () => {
  const appDispatch = useAppDispatch()
  const gameRef = useRef<GameElement | null>(null)
  let intervalId: unknown

  useEffect(() => {
    intervalId = setInterval(() => {
      appDispatch(decrementTime())
    }, 1000)

    return () => {
      clearInterval(intervalId as number)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (gameRef.current) {
        gameRef.current.pause()
      }
    }
  }, [gameRef.current])

  const handleStart = () => {
    if (gameRef.current) {
      gameRef.current.start()
    }
  }

  const handlePause = () => {
    if (gameRef.current) {
      gameRef.current.pause()
    }
  }

  const handleFinish = () => {
    if (gameRef.current) {
      gameRef.current.finish()
    }
  }

  return (
    <Layout className={styles.container}>
      <Typography.Title level={1}>Game start</Typography.Title>
      <div className={styles.controls}>
        <GamePanel game={gameRef.current} />
      </div>
      <div className={styles.gameButtonContainer}>
        <button className={styles.button} onClick={handleStart}>
          <GameIcon name="success" />
        </button>
        <button className={styles.button} onClick={handlePause}>
          <GameIcon name="reload" />
        </button>
        <button className={styles.button} onClick={handleFinish}>
          <GameIcon name="close" />
        </button>
      </div>
      <sfr-game ref={gameRef}></sfr-game>
    </Layout>
  )
}
