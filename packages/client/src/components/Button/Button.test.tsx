import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button test cases', () => {
  it('Should render Button', () => {
    const onClick = jest.fn()
    render(
      <Button onClick={onClick} type="primary">
        Click
      </Button>
    )
    expect(screen.getByText('Click')).toBeInTheDocument()
  })
  it('should call onClick fn', () => {
    const onClick = jest.fn()
    render(
      <Button onClick={onClick} type="primary">
        Click
      </Button>
    )
    const btn = screen.getByText('Click')
    fireEvent.click(btn)
    expect(onClick).toHaveBeenCalled()
  })
})
