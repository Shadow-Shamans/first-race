import '@/game'
import ReactDOM from 'react-dom/client'
import { App } from '@/app'
import { initServiceWorker } from './shared/utils/sw'

const mode = import.meta.env.MODE

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)

if (mode === 'production') {
  initServiceWorker()
} else {
  console.warn(`Service worker is not available in ${mode} mode`)
}
