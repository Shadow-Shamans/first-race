import { useAppDispatch, useAppSelector } from '@/app'
import { GameElement } from '@/game'
import { Layout } from 'antd'

import { useEffect, useRef, useState } from 'react'
import styles from './Game.module.css'
import { GameIcon } from './GameIcon'
import { GamePanel } from './GamePanel'
import { decrementTime, setRunning, setTime } from './gameSlice'
import { selectIsRunning } from './selectors'

export const GameFeature = () => {
  const appDispatch = useAppDispatch()
  const isRunning = useAppSelector(selectIsRunning)
  const gameRef = useRef<GameElement | null>(null)
  const [game, setGame] = useState<GameElement | null>(null)
  let intervalId: unknown

  useEffect(() => {
    if (gameRef.current) {
      setGame(gameRef.current)
    }
    intervalId = setInterval(() => {
      if (isRunning) {
        appDispatch(decrementTime())
      }
    }, 1000)

    return () => {
      clearInterval(intervalId as number)
    }
  }, [isRunning])

  useEffect(() => {
    return () => {
      if (gameRef.current) {
        gameRef.current.pause()
      }
    }
  }, [gameRef.current])

  const handleStart = () => {
    if (gameRef.current) {
      appDispatch(setRunning(true))
      gameRef.current.start()
    }
  }

  const handlePause = () => {
    if (gameRef.current) {
      appDispatch(setRunning(false))
      gameRef.current.pause()
    }
  }

  const handleFinish = () => {
    if (gameRef.current) {
      appDispatch(setRunning(false))
      appDispatch(setTime(132))
      gameRef.current.finish()
    }
  }

  return (
    <Layout className={styles.container}>
      <div className={styles.controls}>
        <GamePanel game={game} />
      </div>
      <div className={styles.gameButtonContainer}>
        <button className={styles.button} onClick={handleStart}>
          <GameIcon name="play" />
        </button>
        <button className={styles.button} onClick={handlePause}>
          <GameIcon name="pause" />
        </button>
        <button className={styles.button} onClick={handleFinish}>
          <GameIcon name="close" />
        </button>
      </div>
      <sfr-game ref={gameRef}></sfr-game>
    </Layout>
  )
}
