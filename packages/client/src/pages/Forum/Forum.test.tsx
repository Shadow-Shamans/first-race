import { render, screen } from '@testing-library/react'
import { Forum } from './Forum'
import { Provider } from 'react-redux'
import store from '@/store'
import { BrowserRouter } from 'react-router-dom'

describe('Forum test cases', () => {
  beforeAll(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Forum />
        </Provider>
      </BrowserRouter>
    )
  })

  it('Should render forum page', () => {
    const forumRoot = screen.getByTestId('forum_root')

    expect(forumRoot).toBeInTheDocument()
  })
})
