import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'
import store, { persistor } from '@/store'
import ErrorBoundary from '@/shared/ErrorBoundary'
import AppRoutes from '@/router'
import ThemeProvider from '@/shared/providers/ThemeProvider'
import AppMenu from '@/features/AppMenu'
import './index.css'
import { Layout } from 'antd'
import styled from './App.module.css'

const { Header, Content } = Layout

export const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={'Loading...'} persistor={persistor}>
        <ThemeProvider>
          <Router>
            <Layout>
              <Header>
                <AppMenu />
              </Header>
              <Content className={styled.content}>
                <AppRoutes />
              </Content>
            </Layout>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
)
