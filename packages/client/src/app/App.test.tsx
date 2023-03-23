import { App } from './App'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'

import store from '../store'

const appContent = 'Loading test data using RTKQuery'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  expect(screen.getByText(appContent)).toBeDefined()
})
