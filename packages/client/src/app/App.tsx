import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'
import store, { persistor } from '@/store'
import ErrorBoundary from '@/shared/utils/ErrorBoundary'
import AppRoutes from '@/router'
import ThemeProvider from '@/shared/providers/ThemeProvider'
import AppMenu from '@/features/AppMenu'
import './index.css'

export const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={'Loading...'} persistor={persistor}>
        <ThemeProvider>
          <Router>
            <AppMenu />
            <AppRoutes />
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
)
