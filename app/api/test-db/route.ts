import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test database connection
    const userCount = await db.user.count()
    const sectionCount = await db.section.count()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected successfully!',
      stats: {
        users: userCount,
        sections: sectionCount
      }
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
