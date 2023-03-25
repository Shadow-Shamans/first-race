import { useTheme } from '@/app'
import { ConfigProvider, theme } from 'antd'
import { FC, ReactElement } from 'react'

export type Props = {
  children: ReactElement
}


const ThemeProvider: FC<Props> = ({ children }) => {
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

export default ThemeProvider
