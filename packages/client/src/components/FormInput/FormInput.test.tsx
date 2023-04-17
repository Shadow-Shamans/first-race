import { render, screen, fireEvent } from '@testing-library/react'
import { FormInput } from './FormInput'

describe('FormInput test cases', () => {
  it('Should render FormInput', () => {
    render(<FormInput placeholder="city" name="Город" />)
    expect(screen.getByPlaceholderText('city')).toBeInTheDocument()
  })
  it('Should change input value', () => {
    render(<FormInput placeholder="city" name="Город" />)
    const input = screen.getByPlaceholderText('city')
    fireEvent.change(input, { target: { value: 'New York' } })
    expect(input).toHaveValue('New York')
  })
})
