import { FC, ReactNode } from 'react'
import { Button as AntdButton, Typography } from 'antd'

import styles from './Button.module.css'

type TType = 'primary' | 'secondary'

interface IProps {
  type: TType
  children: ReactNode
  onClick: () => void
}

const { Text } = Typography

export const Button: FC<IProps> = ({ type, children, onClick }) => {
  return (
    <div className={styles.button}>
      <AntdButton block onClick={onClick}>
        <Text strong>{children}</Text>
      </AntdButton>
    </div>
  )
}
