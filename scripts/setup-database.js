#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Setting up React Learning Platform database...')

  // Create sample sections for the learning platform
  const sections = [
    // Fundamentals
    {
      id: 'intro',
      title: 'Introduction to React',
      content: 'Welcome to React! Learn the basics of this powerful JavaScript library.',
      category: 'fundamentals',
      difficulty: 'beginner',
      estimatedTime: 5,
      prerequisites: [],
      order: 1,
      isPublished: true
    },
    {
      id: 'first-component',
      title: 'Your First Component',
      content: 'Create and render your first React component.',
      category: 'fundamentals',
      difficulty: 'beginner',
      estimatedTime: 10,
      prerequisites: ['intro'],
      order: 2,
      isPublished: true
    },
    {
      id: 'jsx',
      title: 'Understanding JSX',
      content: 'Learn the syntax that makes React components readable.',
      category: 'fundamentals',
      difficulty: 'beginner',
      estimatedTime: 15,
      prerequisites: ['first-component'],
      order: 3,
      isPublished: true
    },
    {
      id: 'props-state',
      title: 'Props and State',
      content: 'Pass data between components and manage local state.',
      category: 'fundamentals',
      difficulty: 'beginner',
      estimatedTime: 20,
      prerequisites: ['jsx'],
      order: 4,
      isPublished: true
    },
    {
      id: 'events',
      title: 'Event Handling',
      content: 'Handle user interactions and events in React.',
      category: 'fundamentals',
      difficulty: 'beginner',
      estimatedTime: 15,
      prerequisites: ['props-state'],
      order: 5,
      isPublished: true
    },
    {
      id: 'conditional',
      title: 'Conditional Rendering',
      content: 'Show and hide components based on conditions.',
      category: 'fundamentals',
      difficulty: 'beginner',
      estimatedTime: 12,
      prerequisites: ['events'],
      order: 6,
      isPublished: true
    },
    {
      id: 'lists',
      title: 'Lists and Keys',
      content: 'Render lists of data efficiently with proper keys.',
      category: 'fundamentals',
      difficulty: 'beginner',
      estimatedTime: 18,
      prerequisites: ['conditional'],
      order: 7,
      isPublished: true
    },
    {
      id: 'forms',
      title: 'Forms and Input',
      content: 'Handle form inputs and user data.',
      category: 'fundamentals',
      difficulty: 'beginner',
      estimatedTime: 25,
      prerequisites: ['lists'],
      order: 8,
      isPublished: true
    },
    // Hooks
    {
      id: 'useState',
      title: 'useState Hook',
      content: 'Manage component state with the useState hook.',
      category: 'hooks',
      difficulty: 'intermediate',
      estimatedTime: 15,
      prerequisites: ['forms'],
      order: 1,
      isPublished: true
    },
    {
      id: 'useEffect',
      title: 'useEffect Hook',
      content: 'Handle side effects and lifecycle events.',
      category: 'hooks',
      difficulty: 'intermediate',
      estimatedTime: 20,
      prerequisites: ['useState'],
      order: 2,
      isPublished: true
    },
    {
      id: 'useContext',
      title: 'useContext Hook',
      content: 'Share data across components without prop drilling.',
      category: 'hooks',
      difficulty: 'intermediate',
      estimatedTime: 18,
      prerequisites: ['useEffect'],
      order: 3,
      isPublished: true
    },
    {
      id: 'useReducer',
      title: 'useReducer Hook',
      content: 'Manage complex state with reducers.',
      category: 'hooks',
      difficulty: 'intermediate',
      estimatedTime: 25,
      prerequisites: ['useContext'],
      order: 4,
      isPublished: true
    },
    {
      id: 'custom-hooks',
      title: 'Custom Hooks',
      content: 'Create reusable logic with custom hooks.',
      category: 'hooks',
      difficulty: 'intermediate',
      estimatedTime: 30,
      prerequisites: ['useReducer'],
      order: 5,
      isPublished: true
    },
    {
      id: 'useMemo',
      title: 'useMemo Hook',
      content: 'Optimize performance with memoization.',
      category: 'hooks',
      difficulty: 'intermediate',
      estimatedTime: 15,
      prerequisites: ['custom-hooks'],
      order: 6,
      isPublished: true
    },
    {
      id: 'useCallback',
      title: 'useCallback Hook',
      content: 'Memoize functions to prevent unnecessary re-renders.',
      category: 'hooks',
      difficulty: 'intermediate',
      estimatedTime: 12,
      prerequisites: ['useMemo'],
      order: 7,
      isPublished: true
    },
    {
      id: 'useRef',
      title: 'useRef Hook',
      content: 'Access DOM elements and persist values.',
      category: 'hooks',
      difficulty: 'intermediate',
      estimatedTime: 20,
      prerequisites: ['useCallback'],
      order: 8,
      isPublished: true
    }
  ]

  console.log('📚 Creating learning sections...')
  
  for (const section of sections) {
    await prisma.section.upsert({
      where: { id: section.id },
      update: section,
      create: section
    })
    console.log(`✅ Created section: ${section.title}`)
  }

  console.log('🎉 Database setup complete!')
  console.log(`📊 Created ${sections.length} learning sections`)
  console.log('')
  console.log('Next steps:')
  console.log('1. Start the development server: npm run dev')
  console.log('2. Visit http://localhost:3000/docs to see the learning platform')
  console.log('3. Click "Login" to track your progress')
}

main()
  .catch((e) => {
    console.error('❌ Error setting up database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
