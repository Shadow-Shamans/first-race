import { render, screen } from '@testing-library/react'
import { App } from './App'
import { Provider } from 'react-redux'
import storeInstance from '@/store'
import { MemoryRouter } from 'react-router-dom'

const appContent = 'Главная'

test('App test cases', () => {
  render(
    <Provider store={storeInstance}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  )
  expect(screen.getByText(appContent)).toBeDefined()
})
