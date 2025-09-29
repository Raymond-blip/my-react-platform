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
    
    try {
      // Try to get user progress from database
      const userProgress = await prisma.userProgress.findMany({
        where: { userId }
      })
      
      // Get total sections count
      const totalSections = await prisma.section.count({
        where: { isPublished: true }
      })
      
      const completedSections = userProgress.length
      const totalTimeSpent = userProgress.reduce((sum, progress) => sum + progress.timeSpent, 0)
      const completionPercentage = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0
      
      // Calculate streak (consecutive days with activity)
      const today = new Date()
      const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
      
      const recentProgress = await prisma.userProgress.findMany({
        where: {
          userId,
          lastAccessed: {
            gte: thirtyDaysAgo
          }
        },
        orderBy: {
          lastAccessed: 'desc'
        }
      })
      
      // Calculate streak
      let streak = 0
      const uniqueDays = new Set()
      recentProgress.forEach(progress => {
        const day = progress.lastAccessed.toDateString()
        uniqueDays.add(day)
      })
      
      // Simple streak calculation - consecutive days with activity
      const sortedDays = Array.from(uniqueDays).sort().reverse()
      let currentStreak = 0
      const todayStr = today.toDateString()
      
      for (let i = 0; i < sortedDays.length; i++) {
        const dayStr = sortedDays[i]
        const dayDate = new Date(dayStr)
        const expectedDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
        
        if (dayDate.toDateString() === expectedDate.toDateString()) {
          currentStreak++
        } else {
          break
        }
      }
      
      const stats = {
        totalSections,
        completedSections,
        completionPercentage,
        timeSpent: totalTimeSpent,
        streak: currentStreak
      }
      
      return NextResponse.json(stats)
    } catch (dbError) {
      console.warn('Database not available, returning default stats:', dbError)
      
      // Return default stats when database is not available
      const stats = {
        totalSections: 36,
        completedSections: 0,
        completionPercentage: 0,
        timeSpent: 0,
        streak: 0
      }
      
      return NextResponse.json(stats)
    }
  } catch (error) {
    console.error('Progress stats API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress stats' },
      { status: 500 }
    )
  }
}
