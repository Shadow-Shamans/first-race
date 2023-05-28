import { Layout } from 'antd'
import ErrorBoundary from '@/shared/ErrorBoundary'
import { ThemeProvider } from '@/shared/providers/ThemeProvider'
import { Header } from '@/components/Header'
import { AppRoutes } from '@/router'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

import styled from './app.module.css'
import './index.css'
import { NotificationProvider } from '@/shared/providers/NotificationProvider'

export const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <NotificationProvider>
          <Layout className={styled.layout}>
            <ThemeSwitcher />
            <Header />
            <Layout.Content className={styled.content}>
              <AppRoutes />
            </Layout.Content>
          </Layout>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
