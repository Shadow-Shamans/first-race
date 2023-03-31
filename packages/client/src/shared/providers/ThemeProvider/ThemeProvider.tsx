import { useTheme } from '@/app'
import { ConfigProvider, theme } from 'antd'
import { FC, ReactElement } from 'react'

interface IProps {
  children: ReactElement
}

export const ThemeProvider: FC<IProps> = ({ children }) => {
  const { defaultAlgorithm, darkAlgorithm } = theme
  const { isDarkMode } = useTheme()

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}>
      {children}
    </ConfigProvider>
  )
}
