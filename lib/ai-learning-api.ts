// AI-Powered Learning Assistant API
export interface LearningPrompt {
  type: 'explain' | 'example' | 'debug' | 'quiz' | 'practice'
  topic: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  context?: string
  userLevel?: string
}

export interface AIResponse {
  content: string
  codeExamples?: CodeExample[]
  suggestions?: string[]
  relatedTopics?: string[]
  difficulty?: string
}

export interface CodeExample {
  title: string
  code: string
  explanation: string
  language: 'jsx' | 'tsx' | 'javascript'
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export class AILearningAPI {
  private openaiUrl = 'https://api.openai.com/v1/chat/completions'
  private apiKey = process.env.OPENAI_API_KEY
  
  async generateExplanation(prompt: LearningPrompt): Promise<AIResponse> {
    try {
      const systemPrompt = `You are a React expert teaching assistant. Provide clear, beginner-friendly explanations of React concepts. Include practical code examples and real-world use cases.`
      
      const userPrompt = `Explain ${prompt.topic} for a ${prompt.difficulty} level developer. ${prompt.context ? `Context: ${prompt.context}` : ''}`
      
      const response = await fetch(this.openaiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      })
      
      const data = await response.json()
      
      return {
        content: data.choices[0].message.content,
        suggestions: this.extractSuggestions(data.choices[0].message.content),
        relatedTopics: this.extractRelatedTopics(data.choices[0].message.content)
      }
    } catch (error) {
      console.error('Error generating explanation:', error)
      throw error
    }
  }
  
  async generateCodeExample(prompt: LearningPrompt): Promise<CodeExample[]> {
    try {
      const systemPrompt = `You are a React expert. Generate practical, well-commented code examples that demonstrate React concepts clearly.`
      
      const userPrompt = `Create a code example for ${prompt.topic} suitable for ${prompt.difficulty} level developers. ${prompt.context ? `Context: ${prompt.context}` : ''}`
      
      const response = await fetch(this.openaiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      })
      
      const data = await response.json()
      
      return this.parseCodeExamples(data.choices[0].message.content)
    } catch (error) {
      console.error('Error generating code example:', error)
      throw error
    }
  }
  
  async generateQuiz(topic: string, difficulty: 'beginner' | 'intermediate' | 'advanced'): Promise<QuizQuestion[]> {
    try {
      const systemPrompt = `You are a React expert creating quiz questions. Generate 5 multiple-choice questions about ${topic} for ${difficulty} level developers.`
      
      const response = await fetch(this.openaiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Create 5 quiz questions about ${topic}` }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      })
      
      const data = await response.json()
      
      return this.parseQuizQuestions(data.choices[0].message.content)
    } catch (error) {
      console.error('Error generating quiz:', error)
      throw error
    }
  }
  
  async debugCode(code: string, error?: string): Promise<AIResponse> {
    try {
      const systemPrompt = `You are a React debugging expert. Help identify and fix issues in React code.`
      
      const userPrompt = `Debug this React code:\n\`\`\`jsx\n${code}\n\`\`\`${error ? `\nError: ${error}` : ''}`
      
      const response = await fetch(this.openaiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.3,
          max_tokens: 1000
        })
      })
      
      const data = await response.json()
      
      return {
        content: data.choices[0].message.content,
        suggestions: this.extractSuggestions(data.choices[0].message.content)
      }
    } catch (error) {
      console.error('Error debugging code:', error)
      throw error
    }
  }
  
  private extractSuggestions(content: string): string[] {
    // Simple regex to extract suggestions from AI response
    const suggestions = content.match(/\d+\.\s*([^.\n]+)/g)
    return suggestions ? suggestions.map(s => s.replace(/^\d+\.\s*/, '')) : []
  }
  
  private extractRelatedTopics(content: string): string[] {
    // Extract topics mentioned in the response
    const topics = content.match(/\*\*([^*]+)\*\*/g)
    return topics ? topics.map(t => t.replace(/\*\*/g, '')) : []
  }
  
  private parseCodeExamples(content: string): CodeExample[] {
    // Parse code examples from AI response
    const codeBlocks = content.match(/```(\w+)?\n([\s\S]*?)```/g)
    if (!codeBlocks) return []
    
    return codeBlocks.map((block, index) => {
      const match = block.match(/```(\w+)?\n([\s\S]*?)```/)
      return {
        title: `Example ${index + 1}`,
        code: match ? match[2] : '',
        explanation: `Code example ${index + 1}`,
        language: (match && match[1]) || 'jsx'
      }
    })
  }
  
  private parseQuizQuestions(content: string): QuizQuestion[] {
    // Parse quiz questions from AI response
    // This is a simplified parser - you might want to use a more robust solution
    const questions = content.split(/\d+\.\s*Question:/)
    return questions.slice(1).map((q, index) => {
      const lines = q.trim().split('\n')
      const question = lines[0] || ''
      const options = lines.filter(line => line.match(/^[A-D]\./))
      const explanation = lines.find(line => line.includes('Explanation:')) || ''
      
      return {
        id: `q${index + 1}`,
        question,
        options: options.map(opt => opt.replace(/^[A-D]\.\s*/, '')),
        correctAnswer: 0, // This would need to be parsed from the AI response
        explanation,
        difficulty: 'beginner' as const
      }
    })
  }
}
