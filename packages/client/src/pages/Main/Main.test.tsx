import { render, screen } from '@testing-library/react'
import { Main } from './Main'
import { Provider } from 'react-redux'
import store from '@/store'
import { BrowserRouter } from 'react-router-dom'

describe('Main page test cases', () => {
  it('Should render Main page', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByText('Управляй!')).toBeInTheDocument()
    expect(screen.getByText('Строй!')).toBeInTheDocument()
    expect(screen.getByText('Зарабатывай!')).toBeInTheDocument()
    expect(screen.getByText('Попади в топ!')).toBeInTheDocument()
  })
})
