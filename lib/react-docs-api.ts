// React Documentation API Integration
export interface ReactDocSection {
  id: string
  title: string
  content: string
  codeExamples: CodeExample[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  prerequisites: string[]
  estimatedTime: number // in minutes
}

export interface CodeExample {
  id: string
  title: string
  code: string
  language: 'jsx' | 'tsx' | 'javascript' | 'typescript'
  description: string
  isInteractive: boolean
}

// Mock data structure - replace with actual API calls
export const reactDocsData: ReactDocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with React',
    content: 'Learn the fundamentals of React...',
    codeExamples: [
      {
        id: 'hello-world',
        title: 'Hello World Component',
        code: `function HelloWorld() {
  return <h1>Hello, World!</h1>;
}`,
        language: 'jsx',
        description: 'Your first React component',
        isInteractive: true
      }
    ],
    difficulty: 'beginner',
    category: 'fundamentals',
    prerequisites: [],
    estimatedTime: 15
  }
]

// API functions to fetch React documentation
export class ReactDocsAPI {
  private baseUrl = 'https://api.reactjs.org' // Replace with actual API
  
  async getSection(id: string): Promise<ReactDocSection> {
    // Mock implementation - replace with actual API call
    const section = reactDocsData.find(s => s.id === id)
    if (!section) throw new Error(`Section ${id} not found`)
    return section
  }
  
  async getAllSections(): Promise<ReactDocSection[]> {
    // Mock implementation - replace with actual API call
    return reactDocsData
  }
  
  async searchDocs(query: string): Promise<ReactDocSection[]> {
    // Mock implementation - replace with actual API call
    return reactDocsData.filter(section => 
      section.title.toLowerCase().includes(query.toLowerCase()) ||
      section.content.toLowerCase().includes(query.toLowerCase())
    )
  }
}
