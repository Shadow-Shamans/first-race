import React from 'react'
import { App } from './src/app'
import { renderToString } from 'react-dom/server'

export function render() {
  return renderToString(<App />)
}
