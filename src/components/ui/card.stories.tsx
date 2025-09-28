import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Product Card</CardTitle>
        <CardDescription>Beautiful product description</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-100 rounded-md mb-4" />
        <p>This is a product card with an image placeholder.</p>
      </CardContent>
    </Card>
  ),
}
