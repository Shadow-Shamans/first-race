import { render } from '@testing-library/react'
import { Forum } from './Forum'
import { Provider } from 'react-redux'
import store from '@/store'
import { BrowserRouter } from 'react-router-dom'

const originalMatchMedia = window.matchMedia

describe('Forum test cases', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })
  afterEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: originalMatchMedia,
    })
  })
  it('Should render forum page', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Forum />
        </Provider>
      </BrowserRouter>
    )
  })
})
