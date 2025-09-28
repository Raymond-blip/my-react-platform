import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }
    
    // Get user progress from database
    const userProgress = await prisma.userProgress.findMany({
      where: { userId },
      include: {
        user: true
      }
    })
    
    const completedSections = userProgress.map(progress => progress.sectionId)
    const totalTimeSpent = userProgress.reduce((sum, progress) => sum + progress.timeSpent, 0)
    const lastAccessed = userProgress.length > 0 
      ? new Date(Math.max(...userProgress.map(p => p.lastAccessed.getTime())))
      : new Date()
    
    const progress = {
      userId,
      completedSections,
      timeSpent: totalTimeSpent,
      lastAccessed,
      achievements: [] // TODO: Implement achievements
    }
    
    return NextResponse.json(progress)
  } catch (error) {
    console.error('Progress API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, sectionId, timeSpent = 0 } = body
    
    if (!userId || !sectionId) {
      return NextResponse.json({ error: 'User ID and section ID required' }, { status: 400 })
    }
    
    // Upsert user progress
    await prisma.userProgress.upsert({
      where: {
        userId_sectionId: {
          userId,
          sectionId
        }
      },
      update: {
        completedAt: new Date(),
        timeSpent: {
          increment: timeSpent
        },
        lastAccessed: new Date()
      },
      create: {
        userId,
        sectionId,
        timeSpent,
        completedAt: new Date(),
        lastAccessed: new Date()
      }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Progress API error:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}
