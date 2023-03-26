import { render, screen } from '@testing-library/react'

import { App } from './App'

const appContent = 'Главная'

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
) as jest.Mock

test('Example test', async () => {
  render(<App />)
  expect(screen.getByText(appContent)).toBeDefined()
})
