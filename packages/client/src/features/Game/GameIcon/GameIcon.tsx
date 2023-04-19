import { FC } from 'react'

import chronometer from '@/assets/chronometer.png'
import coin from '@/assets/coin.png'
import king from '@/assets/king.png'
import score from '@/assets/score.png'
import clock from '@/assets/clock.png'
import close from '@/assets/close.png'
import success from '@/assets/success.png'
import reload from '@/assets/reload.png'
import play from '@/assets/play.svg'
import pause from '@/assets/pause.svg'

import styles from './GameIcon.module.css'

export type TIconName =
  | 'coin'
  | 'king'
  | 'score'
  | 'chronometer'
  | 'clock'
  | 'close'
  | 'success'
  | 'reload'
  | 'play'
  | 'pause'

interface IProps {
  name: TIconName
  sizeContainer?: number
  sizeIcon?: number
}

const iconList: Record<TIconName, string> = {
  coin,
  king,
  score,
  chronometer,
  clock,
  close,
  success,
  reload,
  play,
  pause,
}

export const GameIcon: FC<IProps> = props => {
  const { name, sizeContainer, sizeIcon, ...restProps } = props
  const iconSrc = iconList[name]
  const inlineStylesContainer = sizeContainer
    ? { height: `${sizeContainer}px`, width: `${sizeContainer}px` }
    : {}
  const inlineStylesIcon = sizeIcon
    ? { height: `${sizeIcon}px`, width: `${sizeIcon}px` }
    : {}

  return (
    <span
      style={inlineStylesContainer}
      className={styles.container}
      {...restProps}>
      <img style={inlineStylesIcon} className={styles.img} src={iconSrc} />
    </span>
  )
}
