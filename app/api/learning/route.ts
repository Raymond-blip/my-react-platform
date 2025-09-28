import { NextRequest, NextResponse } from 'next/server'
import { AILearningAPI } from '@/lib/ai-learning-api'

const aiAPI = new AILearningAPI()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, topic, difficulty, context } = body
    
    let response
    
    switch (type) {
      case 'explain':
        response = await aiAPI.generateExplanation({
          type: 'explain',
          topic,
          difficulty,
          context
        })
        break
        
      case 'example':
        response = await aiAPI.generateCodeExample({
          type: 'example',
          topic,
          difficulty,
          context
        })
        break
        
      case 'quiz':
        response = await aiAPI.generateQuiz(topic, difficulty)
        break
        
      case 'debug':
        response = await aiAPI.debugCode(body.code, body.error)
        break
        
      default:
        return NextResponse.json({ error: 'Invalid request type' }, { status: 400 })
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Learning API error:', error)
    return NextResponse.json(
      { error: 'Failed to process learning request' },
      { status: 500 }
    )
  }
}
