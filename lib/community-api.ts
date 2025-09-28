// Community and Q&A API
export interface Question {
  id: string
  title: string
  content: string
  author: User
  tags: string[]
  votes: number
  answers: Answer[]
  createdAt: Date
  updatedAt: Date
  isResolved: boolean
}

export interface Answer {
  id: string
  content: string
  author: User
  votes: number
  isAccepted: boolean
  createdAt: Date
}

export interface User {
  id: string
  name: string
  avatar?: string
  reputation: number
}

export interface Discussion {
  id: string
  title: string
  content: string
  author: User
  replies: Reply[]
  createdAt: Date
  updatedAt: Date
}

export interface Reply {
  id: string
  content: string
  author: User
  createdAt: Date
}

export class CommunityAPI {
  private baseUrl = '/api/community'
  
  // Questions and Answers
  async getQuestions(page = 1, limit = 10): Promise<Question[]> {
    try {
      const response = await fetch(`${this.baseUrl}/questions?page=${page}&limit=${limit}`)
      return await response.json()
    } catch (error) {
      console.error('Error fetching questions:', error)
      return []
    }
  }
  
  async getQuestion(id: string): Promise<Question> {
    try {
      const response = await fetch(`${this.baseUrl}/questions/${id}`)
      return await response.json()
    } catch (error) {
      console.error('Error fetching question:', error)
      throw error
    }
  }
  
  async createQuestion(question: Omit<Question, 'id' | 'createdAt' | 'updatedAt' | 'votes' | 'answers'>): Promise<Question> {
    try {
      const response = await fetch(`${this.baseUrl}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(question)
      })
      return await response.json()
    } catch (error) {
      console.error('Error creating question:', error)
      throw error
    }
  }
  
  async addAnswer(questionId: string, answer: Omit<Answer, 'id' | 'createdAt' | 'votes' | 'isAccepted'>): Promise<Answer> {
    try {
      const response = await fetch(`${this.baseUrl}/questions/${questionId}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answer)
      })
      return await response.json()
    } catch (error) {
      console.error('Error adding answer:', error)
      throw error
    }
  }
  
  // Discussions
  async getDiscussions(page = 1, limit = 10): Promise<Discussion[]> {
    try {
      const response = await fetch(`${this.baseUrl}/discussions?page=${page}&limit=${limit}`)
      return await response.json()
    } catch (error) {
      console.error('Error fetching discussions:', error)
      return []
    }
  }
  
  async createDiscussion(discussion: Omit<Discussion, 'id' | 'createdAt' | 'updatedAt' | 'replies'>): Promise<Discussion> {
    try {
      const response = await fetch(`${this.baseUrl}/discussions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discussion)
      })
      return await response.json()
    } catch (error) {
      console.error('Error creating discussion:', error)
      throw error
    }
  }
  
  // Voting
  async voteQuestion(questionId: string, vote: 'up' | 'down'): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/questions/${questionId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vote })
      })
    } catch (error) {
      console.error('Error voting on question:', error)
      throw error
    }
  }
  
  async voteAnswer(answerId: string, vote: 'up' | 'down'): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/answers/${answerId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vote })
      })
    } catch (error) {
      console.error('Error voting on answer:', error)
      throw error
    }
  }
}
