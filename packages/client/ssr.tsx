import React from 'react'
import { App } from './src/app'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { storeInstance } from './src/store'
import { Provider } from 'react-redux'

export function render(url: string) {
  const initialState = storeInstance.getState()
  const renderResult = renderToString(
    <StaticRouter location={url}>
      <Provider store={storeInstance}>
        <App />
      </Provider>
    </StaticRouter>
  )
  return [initialState, renderResult]
}
