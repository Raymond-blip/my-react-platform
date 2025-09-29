"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Trophy, Clock, TrendingUp } from "lucide-react"
import { useProgress } from "@/lib/hooks/useProgress"

interface ProgressNotificationProps {
  onClose: () => void
}

export function ProgressNotification({ onClose }: ProgressNotificationProps) {
  const { progress, stats } = useProgress()
  const [showNotification, setShowNotification] = useState(false)
  const [notificationType, setNotificationType] = useState<"lesson" | "achievement" | "streak" | null>(null)

  useEffect(() => {
    if (progress && stats) {
      // Check for new achievements
      const completedLessons = progress.completedSections.length
      const achievements = [
        ...(completedLessons >= 1 ? ["React Beginner"] : []),
        ...(completedLessons >= 3 ? ["JSX Pro"] : []),
        ...(completedLessons >= 5 ? ["Hooks Master"] : []),
        ...(completedLessons >= 8 ? ["React Expert"] : []),
        ...(stats.timeSpent >= 60 ? ["Dedicated Learner"] : []),
        ...(stats.streak >= 3 ? ["Learning Streak"] : []),
      ]

      // Show notification for new achievements
      if (achievements.length > 0) {
        setNotificationType("achievement")
        setShowNotification(true)
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
          setShowNotification(false)
          setTimeout(() => onClose(), 300)
        }, 5000)
      }
    }
  }, [progress, stats, onClose])

  if (!showNotification || !notificationType) return null

  const getNotificationContent = () => {
    switch (notificationType) {
      case "achievement":
        return {
          icon: <Trophy className="h-6 w-6 text-yellow-500" />,
          title: "Achievement Unlocked! 🎉",
          message: "You've earned a new achievement for your progress!",
          color: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800"
        }
      case "lesson":
        return {
          icon: <CheckCircle className="h-6 w-6 text-green-500" />,
          title: "Lesson Completed! ✅",
          message: "Great job! You've completed another lesson.",
          color: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
        }
      case "streak":
        return {
          icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
          title: "Learning Streak! 🔥",
          message: "You're on fire! Keep up the great work!",
          color: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800"
        }
      default:
        return {
          icon: <Clock className="h-6 w-6 text-blue-500" />,
          title: "Progress Update",
          message: "Your learning progress has been updated.",
          color: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
        }
    }
  }

  const content = getNotificationContent()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="fixed top-4 right-4 z-50 max-w-sm"
      >
        <Card className={`shadow-lg border-2 ${content.color}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              {content.icon}
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{content.title}</h4>
                <p className="text-xs text-muted-foreground">{content.message}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {stats?.completionPercentage || 0}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
