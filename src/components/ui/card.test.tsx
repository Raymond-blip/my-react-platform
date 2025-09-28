import { render, screen } from '@testing-library/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'

describe('Card Components', () => {
  it('renders Card with content', () => {
    render(
      <Card>
        <CardContent>Card content</CardContent>
      </Card>
    )
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders Card with header and content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card content</CardContent>
      </Card>
    )
    
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card Description')).toBeInTheDocument()
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies custom className to Card', () => {
    render(
      <Card className="custom-card">
        <CardContent>Content</CardContent>
      </Card>
    )
    // The Card component should have the custom class
    const cardElement = screen.getByText('Content').closest('[class*="custom-card"]')
    expect(cardElement).toHaveClass('custom-card')
  })
})
