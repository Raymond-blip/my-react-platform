import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const sectionId = searchParams.get('sectionId')
    
    if (!userId || !sectionId) {
      return NextResponse.json({ error: 'User ID and section ID required' }, { status: 400 })
    }
    
    // Get section progress
    const sectionProgress = await prisma.userProgress.findUnique({
      where: {
        userId_sectionId: {
          userId,
          sectionId
        }
      }
    })
    
    if (!sectionProgress) {
      return NextResponse.json({
        sectionId,
        completed: false,
        timeSpent: 0,
        lastAccessed: new Date()
      })
    }
    
    return NextResponse.json({
      sectionId,
      completed: true,
      timeSpent: sectionProgress.timeSpent,
      lastAccessed: sectionProgress.lastAccessed
    })
  } catch (error) {
    console.error('Section progress API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch section progress' },
      { status: 500 }
    )
  }
}
