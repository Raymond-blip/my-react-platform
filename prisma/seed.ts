import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create initial learning sections
  const sections = [
    {
      id: 'intro',
      title: 'Introduction to React',
      content: 'Learn the basics of React and how it works.',
      category: 'fundamentals',
      difficulty: 'beginner',
      estimatedTime: 30,
      prerequisites: [],
      order: 1,
    },
    {
      id: 'first-component',
      title: 'Your First Component',
      content: 'Create your first React component and understand JSX.',
      category: 'fundamentals',
      difficulty: 'beginner',
      estimatedTime: 45,
      prerequisites: ['intro'],
      order: 2,
    },
    {
      id: 'jsx',
      title: 'Understanding JSX',
      content: 'Learn how JSX works and how to write it effectively.',
      category: 'fundamentals',
      difficulty: 'beginner',
      estimatedTime: 40,
      prerequisites: ['first-component'],
      order: 3,
    },
    {
      id: 'props',
      title: 'Props and Data Flow',
      content: 'Understand how to pass data between components using props.',
      category: 'fundamentals',
      difficulty: 'beginner',
      estimatedTime: 50,
      prerequisites: ['jsx'],
      order: 4,
    },
    {
      id: 'state',
      title: 'State and useState',
      content: 'Learn how to manage component state with useState hook.',
      category: 'fundamentals',
      difficulty: 'intermediate',
      estimatedTime: 60,
      prerequisites: ['props'],
      order: 5,
    },
    {
      id: 'useEffect',
      title: 'useEffect Hook',
      content: 'Understand side effects and the useEffect hook.',
      category: 'hooks',
      difficulty: 'intermediate',
      estimatedTime: 70,
      prerequisites: ['state'],
      order: 6,
    },
    {
      id: 'forms',
      title: 'Forms and Controlled Components',
      content: 'Learn how to handle forms and user input in React.',
      category: 'fundamentals',
      difficulty: 'intermediate',
      estimatedTime: 55,
      prerequisites: ['state'],
      order: 7,
    },
    {
      id: 'conditional-rendering',
      title: 'Conditional Rendering',
      content: 'Learn how to conditionally render components and elements.',
      category: 'fundamentals',
      difficulty: 'beginner',
      estimatedTime: 35,
      prerequisites: ['jsx'],
      order: 8,
    },
    {
      id: 'lists-keys',
      title: 'Lists and Keys',
      content: 'Learn how to render lists and use keys effectively.',
      category: 'fundamentals',
      difficulty: 'intermediate',
      estimatedTime: 45,
      prerequisites: ['conditional-rendering'],
      order: 9,
    },
    {
      id: 'lifting-state',
      title: 'Lifting State Up',
      content: 'Understand how to share state between components.',
      category: 'fundamentals',
      difficulty: 'intermediate',
      estimatedTime: 65,
      prerequisites: ['state'],
      order: 10,
    },
  ]

  // Create sections
  for (const section of sections) {
    await prisma.section.upsert({
      where: { id: section.id },
      update: section,
      create: section,
    })
  }

  // Create code examples for the first component
  const codeExamples = [
    {
      id: 'hello-world',
      sectionId: 'first-component',
      title: 'Hello World Component',
      code: `function HelloWorld() {
  return <h1>Hello, World!</h1>;
}

export default HelloWorld;`,
      language: 'jsx',
      description: 'A simple React component that displays "Hello, World!"',
      isInteractive: true,
      order: 1,
    },
    {
      id: 'greeting-component',
      sectionId: 'first-component',
      title: 'Greeting Component',
      code: `function Greeting({ name }) {
  return <h2>Hello, {name}!</h2>;
}

export default Greeting;`,
      language: 'jsx',
      description: 'A component that accepts a name prop and displays a personalized greeting',
      isInteractive: true,
      order: 2,
    },
    {
      id: 'jsx-basics',
      sectionId: 'jsx',
      title: 'JSX Basics',
      code: `function JSXExample() {
  const name = "React";
  const isLearning = true;
  
  return (
    <div>
      <h1>Welcome to {name}!</h1>
      {isLearning && <p>You are learning React!</p>}
      <button onClick={() => alert('Hello!')}>
        Click me
      </button>
    </div>
  );
}

export default JSXExample;`,
      language: 'jsx',
      description: 'Basic JSX syntax including variables, conditionals, and event handlers',
      isInteractive: true,
      order: 1,
    },
  ]

  // Create code examples
  for (const example of codeExamples) {
    await prisma.codeExample.upsert({
      where: { id: example.id },
      update: example,
      create: example,
    })
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
