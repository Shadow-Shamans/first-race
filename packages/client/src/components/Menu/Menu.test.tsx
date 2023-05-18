import { render, screen } from '@testing-library/react'
import { Menu } from './Menu'
import { createMemoryHistory } from 'history'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import storeInstance from '@/store'

describe('Menu test cases', () => {
  it('Should render public Menu', () => {
    render(
      <Provider store={storeInstance}>
        <MemoryRouter>
          <Menu />
        </MemoryRouter>
      </Provider>
    )
    expect(screen.getByText('Главная')).toBeInTheDocument()
    expect(screen.getByText('Логин')).toBeInTheDocument()
    expect(screen.getByText('Регистрация')).toBeInTheDocument()
    expect(screen.getByText('Играть')).toBeInTheDocument()
  })

  it('Should render all menu items for not logged in', () => {
    render(
      <Provider store={storeInstance}>
        <MemoryRouter>
          <Menu />
        </MemoryRouter>
      </Provider>
    )
    expect(screen.getAllByTestId('menu-item')).toHaveLength(3)
  })

  it('Should render new route', () => {
    render(
      <Provider store={storeInstance}>
        <MemoryRouter>
          <Menu />
        </MemoryRouter>
      </Provider>
    )
    const history = createMemoryHistory()
    history.push('/login')
    expect(history.location.pathname).toBe('/login')
  })
})
