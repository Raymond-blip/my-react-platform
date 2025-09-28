# React UI Library

A modern, accessible, and customizable React component library built with TypeScript, Tailwind CSS, and Radix UI primitives.

## ✨ Features

- 🎨 **18+ UI Components** - Button, Card, Input, Select, Tabs, and more
- 🎯 **TypeScript Support** - Fully typed with comprehensive type definitions
- 🎨 **Tailwind CSS** - Utility-first styling with customizable design tokens
- ♿ **Accessible** - Built on Radix UI primitives for accessibility
- 📱 **Responsive** - Mobile-first design approach
- 🧪 **Tested** - Comprehensive test coverage with Vitest and React Testing Library
- 📚 **Documented** - Interactive Storybook documentation
- 🌳 **Tree-shakable** - Import only what you need

## 🚀 Quick Start

### Installation

```bash
npm install @your-org/react-ui-library
# or
yarn add @your-org/react-ui-library
# or
pnpm add @your-org/react-ui-library
```

### Usage

```tsx
import { Button, Card, Badge } from '@your-org/react-ui-library'

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary">New</Badge>
        </CardContent>
      </Card>
    </div>
  )
}
```

## 📦 Components

### Form Components
- **Button** - Interactive button with multiple variants
- **Input** - Text input with validation states
- **Select** - Dropdown selection component
- **Textarea** - Multi-line text input
- **Label** - Form field labels

### Layout Components
- **Card** - Container with header, content, and footer
- **Separator** - Visual divider between content
- **Tabs** - Tabbed navigation interface
- **Collapsible** - Expandable content sections

### Feedback Components
- **Alert** - Notification messages
- **Badge** - Status indicators and labels
- **Progress** - Progress indicators
- **Loading Dots** - Loading animation

### Navigation Components
- **Avatar** - User profile images
- **Scroll Area** - Custom scrollable areas
- **Resizable** - Resizable panels

## 🎨 Styling

This library uses Tailwind CSS for styling. Make sure to include Tailwind CSS in your project:

```bash
npm install tailwindcss
```

Add the library's styles to your Tailwind config:

```js
// tailwind.config.js
module.exports = {
  content: [
    './node_modules/@your-org/react-ui-library/dist/**/*.js',
    // ... your other content paths
  ],
  // ... rest of your config
}
```

## 🧪 Testing

The library includes comprehensive tests. Run them with:

```bash
npm run test
npm run test:ui  # Interactive test UI
```

## 📚 Documentation

View the interactive Storybook documentation:

```bash
npm run storybook
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Setup

```bash
git clone https://github.com/your-username/react-ui-library.git
cd react-ui-library
npm install
```

### Build

```bash
npm run build
```

### Development

```bash
npm run dev:lib  # Watch mode for library development
npm run storybook  # Storybook development server
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📞 Support

- 📧 Email: support@your-org.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/react-ui-library/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/react-ui-library/discussions)

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) for design inspiration
