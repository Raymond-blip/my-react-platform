"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock, Trophy, Target } from "lucide-react"
import { motion } from "framer-motion"
import { useProgress } from "@/lib/hooks/useProgress"

interface ProgressTrackerProps {
  currentLesson: number
  totalLessons: number
  completedLessons: string[]
  currentPath: string
}

export function ProgressTracker({ currentLesson, totalLessons, completedLessons, currentPath }: ProgressTrackerProps) {
  const { progress: userProgress, stats, loading, markComplete, isCompleted } = useProgress()
  
  // Use real progress data if available, fallback to props
  const actualCompletedLessons = userProgress?.completedSections || completedLessons
  const actualProgress = stats?.completionPercentage || (actualCompletedLessons.length / totalLessons) * 100

  const lessons = [
    { id: "intro", title: "Introduction", href: "/docs/fundamentals/intro" },
    { id: "first-component", title: "Your First Component", href: "/docs/fundamentals/first-component" },
    { id: "jsx", title: "Understanding JSX", href: "/docs/fundamentals/jsx" },
    { id: "props-state", title: "Props and State", href: "/docs/fundamentals/props-state" },
    { id: "events", title: "Event Handling", href: "/docs/fundamentals/events" },
    { id: "conditional", title: "Conditional Rendering", href: "/docs/fundamentals/conditional" },
    { id: "lists", title: "Lists and Keys", href: "/docs/fundamentals/lists" },
    { id: "forms", title: "Forms", href: "/docs/fundamentals/forms" },
  ]

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-80">
        <Card className="sticky top-24">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-2 bg-muted rounded"></div>
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-3 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-80">
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Your Progress
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>React Fundamentals</span>
              <span>{Math.round(actualProgress)}%</span>
            </div>
            <Progress value={actualProgress} />
            <p className="text-xs text-muted-foreground">
              {actualCompletedLessons.length} of {totalLessons} lessons completed
            </p>
            {stats && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {Math.round(stats.timeSpent)}m
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {stats.streak} day streak
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lessons.map((lesson, index) => {
              const completed = isCompleted(lesson.id) || actualCompletedLessons.includes(lesson.id)
              const isCurrent = currentPath.includes(lesson.id)

              return (
                <div
                  key={lesson.id}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    isCurrent ? "bg-primary/10 border border-primary/20" : ""
                  }`}
                >
                  {completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : isCurrent ? (
                    <Clock className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span className={`text-sm ${isCurrent ? "font-medium" : ""}`}>{lesson.title}</span>
                  {isCurrent && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Current
                    </Badge>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
