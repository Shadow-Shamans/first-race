import '@/game'
import { hydrateRoot } from 'react-dom/client'
import { App } from '@/app'
import { initServiceWorker } from './shared/utils/sw'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { RootState, createStore } from './store'

const mode = import.meta.env.MODE

const initialState: RootState = JSON.parse(window.initialState as string)

window.initialState = null

const store = createStore(initialState)

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)

if (mode === 'production') {
  initServiceWorker()
} else {
  console.warn(`Service worker is not available in ${mode} mode`)
}
