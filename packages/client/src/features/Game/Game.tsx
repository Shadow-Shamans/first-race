import { useEffect, useRef } from 'react'
import { Game } from '@/game/arkanoid'
import { Layout, FloatButton } from 'antd'

import styles from './GameArkanoid.module.css'
import { StateGame } from '@/game/arkanoid/types'
import { useAddScoreMutation } from '@/shared/services/LeaderboardService'
import { selectUserData } from '@/features/User/selectors'
import { useAppSelector } from '@/app'
import { useFullscreen } from '@/shared/hooks'
import { FullscreenOutlined } from '@ant-design/icons'

export const GameFeature = () => {
  const gameRef = useRef<HTMLDivElement>(null)
  const [addScore] = useAddScoreMutation()
  const { id: userId, login: username } = useAppSelector(selectUserData)
  const [, toggleFullscreen] = useFullscreen(gameRef.current as HTMLElement)

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
      <FloatButton
        onClick={() => toggleFullscreen()}
        icon={<FullscreenOutlined rev={undefined} />}
      />
      <div ref={gameRef} className={styles.gameContainer}></div>
    </Layout>
  )
}
