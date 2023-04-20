import { render, screen } from '@testing-library/react'
import { Menu } from './Menu'
import { createMemoryHistory } from 'history'
import { MemoryRouter } from 'react-router-dom'

describe('Menu test cases', () => {
  it('Should render Menu', () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    )

    expect(screen.getByText('Главная')).toBeInTheDocument()
    expect(screen.getByText('Логин')).toBeInTheDocument()
    expect(screen.getByText('Регистрация')).toBeInTheDocument()
    expect(screen.getByText('Профиль')).toBeInTheDocument()
    expect(screen.getByText('Форум')).toBeInTheDocument()
    expect(screen.getByText('Играть')).toBeInTheDocument()
    expect(screen.getByText('Лидерборд')).toBeInTheDocument()
  })

  it('Should render all menu items', () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    )

    expect(screen.getAllByTestId('menu-item')).toHaveLength(6)
  })

  it('Should render new route', () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    )

    const history = createMemoryHistory()

    history.push('/login')
    expect(history.location.pathname).toBe('/login')
  })
})
