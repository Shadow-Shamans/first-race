import { FC } from 'react'

import chronometer from '@/assets/chronometer.png'
import coin from '@/assets/coin.png'
import king from '@/assets/king.png'
import score from '@/assets/score.png'
import clock from '@/assets/clock.png'
import close from '@/assets/close.png'
import success from '@/assets/success.png'
import reload from '@/assets/reload.png'

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

interface IProps {
  name: TIconName
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
}

export const GameIcon: FC<IProps> = props => {
  const { name, ...restProps } = props
  const iconSrc = iconList[name]

  return (
    <span className={styles.container} {...restProps}>
      <img className={styles.img} src={iconSrc} />
    </span>
  )
}
