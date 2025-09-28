import { render, screen } from '@testing-library/react'
import { Badge } from './badge'

describe('Badge', () => {
  it('renders with default variant', () => {
    render(<Badge>Default Badge</Badge>)
    expect(screen.getByText('Default Badge')).toBeInTheDocument()
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Badge variant="secondary">Secondary</Badge>)
    expect(screen.getByText('Secondary')).toHaveClass('bg-secondary')

    rerender(<Badge variant="destructive">Destructive</Badge>)
    expect(screen.getByText('Destructive')).toHaveClass('bg-destructive')

    rerender(<Badge variant="outline">Outline</Badge>)
    expect(screen.getByText('Outline')).toHaveClass('border')
  })

  it('applies custom className', () => {
    render(<Badge className="custom-badge">Custom</Badge>)
    expect(screen.getByText('Custom')).toHaveClass('custom-badge')
  })
})
