"use client"

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { ProgressAPI, UserProgress, ProgressStats, SectionProgress } from '@/lib/progress-api'

const progressAPI = new ProgressAPI()

export function useProgress() {
  const { data: session, status } = useSession()
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [stats, setStats] = useState<ProgressStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Use GitHub user ID or fallback to anonymous
  const userId = session?.user?.email || "anonymous"

  const loadProgress = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [userProgress, progressStats] = await Promise.all([
        progressAPI.getUserProgress(userId),
        progressAPI.getProgressStats(userId)
      ])
      
      setProgress(userProgress)
      setStats(progressStats)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load progress')
      console.error('Error loading progress:', err)
    } finally {
      setLoading(false)
    }
  }, [userId])

  const markComplete = useCallback(async (sectionId: string, timeSpent: number = 0) => {
    try {
      await progressAPI.updateProgress(userId, sectionId, timeSpent)
      
      // Update local state
      if (progress) {
        const updatedProgress = {
          ...progress,
          completedSections: progress.completedSections.includes(sectionId)
            ? progress.completedSections
            : [...progress.completedSections, sectionId],
          timeSpent: progress.timeSpent + timeSpent,
          lastAccessed: new Date()
        }
        setProgress(updatedProgress)
        
        // Update stats
        if (stats) {
          const updatedStats = {
            ...stats,
            completedSections: updatedProgress.completedSections.length,
            completionPercentage: Math.round((updatedProgress.completedSections.length / stats.totalSections) * 100),
            timeSpent: updatedProgress.timeSpent
          }
          setStats(updatedStats)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update progress')
      console.error('Error updating progress:', err)
    }
  }, [userId, progress, stats])

  const isCompleted = useCallback((sectionId: string) => {
    return progress?.completedSections.includes(sectionId) ?? false
  }, [progress])

  useEffect(() => {
    if (status !== "loading") {
      loadProgress()
    }
  }, [status, loadProgress])

  return {
    progress,
    stats,
    loading,
    error,
    markComplete,
    isCompleted,
    refresh: loadProgress
  }
}

export function useSectionProgress(sectionId: string) {
  const { data: session, status } = useSession()
  const [sectionProgress, setSectionProgress] = useState<SectionProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Use GitHub user ID or fallback to anonymous
  const userId = session?.user?.email || "anonymous"

  const loadSectionProgress = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const progress = await progressAPI.getSectionProgress(userId, sectionId)
      setSectionProgress(progress)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load section progress')
      console.error('Error loading section progress:', err)
    } finally {
      setLoading(false)
    }
  }, [userId, sectionId])

  const markComplete = useCallback(async (timeSpent: number = 0) => {
    try {
      await progressAPI.updateProgress(userId, sectionId, timeSpent)
      
      // Update local state
      setSectionProgress(prev => prev ? {
        ...prev,
        completed: true,
        timeSpent: prev.timeSpent + timeSpent,
        lastAccessed: new Date()
      } : {
        sectionId,
        completed: true,
        timeSpent,
        lastAccessed: new Date()
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update section progress')
      console.error('Error updating section progress:', err)
    }
  }, [userId, sectionId])

  useEffect(() => {
    if (status !== "loading" && sectionId) {
      loadSectionProgress()
    }
  }, [status, sectionId, loadSectionProgress])

  return {
    sectionProgress,
    loading,
    error,
    markComplete,
    refresh: loadSectionProgress
  }
}
