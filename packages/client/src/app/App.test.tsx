import { render, screen } from '@testing-library/react'

import { App } from './App'

const appContent = 'Loading test data using RTKQuery'

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
) as jest.Mock;

test('Example test', async () => {
  render(<App />)
  expect(screen.getByText(appContent)).toBeDefined()
})
