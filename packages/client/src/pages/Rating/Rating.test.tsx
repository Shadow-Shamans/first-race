import { render } from '@testing-library/react'
import { Rating } from './Rating'
import { Provider } from 'react-redux'
import store from '@/store'
import { BrowserRouter } from 'react-router-dom'

describe('Rating test cases', () => {
  it('Should render Rating page', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Rating />
        </Provider>
      </BrowserRouter>
    )
  })
})
