// Note: PrismaClient should only be used in server-side code
// This file is for client-side progress API calls

// Progress Tracking API
export interface UserProgress {
  userId: string
  completedSections: string[]
  currentSection?: string
  timeSpent: number // in minutes
  lastAccessed: Date
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: Date
}

export interface ProgressStats {
  totalSections: number
  completedSections: number
  completionPercentage: number
  timeSpent: number
  streak: number
}

export interface SectionProgress {
  sectionId: string
  completed: boolean
  timeSpent: number
  lastAccessed: Date
}

export class ProgressAPI {
  private baseUrl = '/api/progress'
  
  async getUserProgress(userId: string): Promise<UserProgress> {
    try {
      const response = await fetch(`${this.baseUrl}?userId=${userId}`)
      if (!response.ok) {
        // Return default progress for new users
        return {
          userId,
          completedSections: [],
          timeSpent: 0,
          lastAccessed: new Date(),
          achievements: []
        }
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching user progress:', error)
      // Fallback to local storage
      return this.getLocalProgress(userId)
    }
  }
  
  async updateProgress(userId: string, sectionId: string, timeSpent: number = 0): Promise<void> {
    try {
      await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          sectionId,
          timeSpent,
          timestamp: new Date().toISOString()
        })
      })
    } catch (error) {
      console.error('Error updating progress:', error)
      // Fallback to local storage
      this.updateLocalProgress(userId, sectionId, timeSpent)
    }
  }
  
  async getProgressStats(userId: string): Promise<ProgressStats> {
    try {
      const response = await fetch(`${this.baseUrl}/stats?userId=${userId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch stats')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching progress stats:', error)
      // Fallback to local calculation
      return this.getLocalProgressStats(userId)
    }
  }

  async getSectionProgress(userId: string, sectionId: string): Promise<SectionProgress> {
    try {
      const response = await fetch(`${this.baseUrl}/section?userId=${userId}&sectionId=${sectionId}`)
      if (!response.ok) {
        return {
          sectionId,
          completed: false,
          timeSpent: 0,
          lastAccessed: new Date()
        }
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching section progress:', error)
      return this.getLocalSectionProgress(userId, sectionId)
    }
  }
  
  // Local storage fallback methods
  getLocalProgress(userId: string): UserProgress {
    const stored = localStorage.getItem(`progress_${userId}`)
    if (stored) {
      const parsed = JSON.parse(stored)
      return {
        ...parsed,
        lastAccessed: new Date(parsed.lastAccessed)
      }
    }
    
    return {
      userId,
      completedSections: [],
      timeSpent: 0,
      lastAccessed: new Date(),
      achievements: []
    }
  }
  
  saveLocalProgress(progress: UserProgress): void {
    localStorage.setItem(`progress_${progress.userId}`, JSON.stringify(progress))
  }

  updateLocalProgress(userId: string, sectionId: string, timeSpent: number = 0): void {
    const progress = this.getLocalProgress(userId)
    if (!progress.completedSections.includes(sectionId)) {
      progress.completedSections.push(sectionId)
    }
    progress.timeSpent += timeSpent
    progress.lastAccessed = new Date()
    this.saveLocalProgress(progress)
  }

  getLocalSectionProgress(userId: string, sectionId: string): SectionProgress {
    const progress = this.getLocalProgress(userId)
    return {
      sectionId,
      completed: progress.completedSections.includes(sectionId),
      timeSpent: 0, // We don't track individual section time in local storage
      lastAccessed: progress.lastAccessed
    }
  }

  getLocalProgressStats(userId: string): ProgressStats {
    const progress = this.getLocalProgress(userId)
    const totalSections = 36 // Total lessons across all sections
    const completedSections = progress.completedSections.length
    
    return {
      totalSections,
      completedSections,
      completionPercentage: Math.round((completedSections / totalSections) * 100),
      timeSpent: progress.timeSpent,
      streak: 0 // We don't track streaks in local storage
    }
  }
}
