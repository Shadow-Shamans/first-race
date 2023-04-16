import { render, screen, fireEvent } from '@testing-library/react'
import { Menu } from './Menu'
import { BrowserRouter } from 'react-router-dom'

describe('Menu test cases', () => {
  it('Should render Menu', () => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    )
    expect(screen.getByText('Главная')).toBeInTheDocument()
    expect(screen.getByText('Логин')).toBeInTheDocument()
    expect(screen.getByText('Регистрация')).toBeInTheDocument()
    expect(screen.getByText('Профиль')).toBeInTheDocument()
    expect(screen.getByText('Форум')).toBeInTheDocument()
    expect(screen.getByText('Играть')).toBeInTheDocument()
  })
  it('Should render all menu items', () => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    )
    expect(screen.getAllByTestId('menu-item')).toHaveLength(5)
  })
})
