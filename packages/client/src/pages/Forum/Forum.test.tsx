import { render, screen } from '@testing-library/react'
import { Forum } from './Forum'
import { Provider } from 'react-redux'
import store from '@/store'
import { BrowserRouter } from 'react-router-dom'

describe('Forum test cases', () => {
  it('Should render forum page', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Forum />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByText('Создать новый')).toBeInTheDocument()
  })
})
