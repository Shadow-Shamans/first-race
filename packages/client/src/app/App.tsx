import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Layout, theme } from 'antd'
import store, { persistor } from '@/store'
import ErrorBoundary from '@/shared/ErrorBoundary'
import { AppRoutes } from '@/router'
import { ThemeProvider } from '@/shared/providers/ThemeProvider'
import { Header } from '@/components/Header'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

import './index.css'

export const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={'Loading...'} persistor={persistor}>
        <ThemeProvider>
          <Layout>
            <Router>
              <ThemeSwitcher />
              <Header />
              <AppRoutes />
            </Router>
          </Layout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
)
