import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './src/app'
import { renderToString } from 'react-dom/server'

export function render() {
  return renderToString(<App />)
}

// ReactDOM.hydrateRoot(
//   document.getElementById('root') as HTMLElement,
//   <App />
// )
