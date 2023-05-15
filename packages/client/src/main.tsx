import '@/game'
import ReactDOM from 'react-dom/client'
import { App } from '@/app'
import { initServiceWorker } from './shared/utils/sw'

const mode = import.meta.env.MODE

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, <App />)

if (mode === 'production') {
  initServiceWorker()
} else {
  console.warn(`Service worker is not available in ${mode} mode`)
}
