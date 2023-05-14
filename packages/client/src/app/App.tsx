import { Layout } from 'antd'
import ErrorBoundary from '@/shared/ErrorBoundary'
import { ThemeProvider } from '@/shared/providers/ThemeProvider'
import { Header } from '@/components/Header'
import { AppRoutes } from '@/router'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

import './index.css'

export const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Layout style={{ minHeight: '100vh' }}>
          <ThemeSwitcher />
          <Header />
          <Layout.Content style={{ position: 'relative' }}>
            <AppRoutes />
          </Layout.Content>
        </Layout>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
