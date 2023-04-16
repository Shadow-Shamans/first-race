import { render, screen } from '@testing-library/react'
import { Login } from './Login'
import { Provider } from 'react-redux'
import store from '@/store'
import { BrowserRouter } from 'react-router-dom'

describe('Login test cases', () => {
  it('Should render Login page', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByText('Войти')).toBeInTheDocument()
  })
})
