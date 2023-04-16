import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '@/store'
import { BrowserRouter } from 'react-router-dom'
import { ErrorPage } from './ErrorPage'

describe('ErrorPage test cases', () => {
  it('Should render Error page', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ErrorPage code={404} text="Ресурс не найден" />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByText('Ресурс не найден')).toBeInTheDocument()
  })
})
