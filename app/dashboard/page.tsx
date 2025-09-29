"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Trophy, User, BookOpen, Zap, Target, Clock, TrendingUp, Award, Calendar, Star, CheckCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { useProgress } from "@/lib/hooks/useProgress"
import { ProgressNotification } from "@/components/progress-notification"
import Link from "next/link"

const LESSONS = [
  { id: "intro", title: "Introduction to React", duration: "15 min", href: "/docs/fundamentals/intro" },
  { id: "first-component", title: "Your First Component", duration: "20 min", href: "/docs/fundamentals/first-component" },
  { id: "jsx", title: "Understanding JSX", duration: "25 min", href: "/docs/fundamentals/jsx" },
  { id: "props-state", title: "Props and State", duration: "30 min", href: "/docs/fundamentals/props-state" },
  { id: "events", title: "Event Handling", duration: "20 min", href: "/docs/fundamentals/events" },
  { id: "conditional", title: "Conditional Rendering", duration: "20 min", href: "/docs/fundamentals/conditional" },
  { id: "lists", title: "Lists and Keys", duration: "25 min", href: "/docs/fundamentals/lists" },
  { id: "forms", title: "Forms", duration: "30 min", href: "/docs/fundamentals/forms" },
]

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const { progress: userProgress, stats, loading, error, isCompleted, refresh } = useProgress()
  const [showNotification, setShowNotification] = useState(true)
  
  // Real-time progress calculations
  const completedLessons = userProgress?.completedSections || []
  const lessonsCompleted = completedLessons.length
  const totalLessons = LESSONS.length
  const progressPercentage = stats?.completionPercentage || Math.round((lessonsCompleted / totalLessons) * 100)
  const timeSpent = stats?.timeSpent || 0
  const streak = stats?.streak || 0
  
  // Dynamic achievements based on real progress
  const achievements = [
    ...(lessonsCompleted >= 1 ? [{ id: "beginner", title: "React Beginner", description: "Completed your first lesson", icon: "🎯" }] : []),
    ...(lessonsCompleted >= 3 ? [{ id: "jsx-pro", title: "JSX Pro", description: "Mastered JSX fundamentals", icon: "⚡" }] : []),
    ...(lessonsCompleted >= 5 ? [{ id: "hooks-master", title: "Hooks Master", description: "Completed 5+ lessons", icon: "🎣" }] : []),
    ...(lessonsCompleted >= 8 ? [{ id: "react-expert", title: "React Expert", description: "Completed all fundamentals", icon: "🏆" }] : []),
    ...(timeSpent >= 60 ? [{ id: "dedicated", title: "Dedicated Learner", description: "Spent 1+ hour learning", icon: "⏰" }] : []),
    ...(streak >= 3 ? [{ id: "streak", title: "Learning Streak", description: "3+ day learning streak", icon: "🔥" }] : []),
  ]

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto max-w-6xl py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto max-w-6xl py-12">
          <Card className="text-center">
            <CardContent className="py-12">
              <div className="text-red-500 mb-4">⚠️ Error loading progress</div>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={refresh}>Try Again</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {showNotification && (
        <ProgressNotification onClose={() => setShowNotification(false)} />
      )}
      <div className="container mx-auto max-w-6xl py-12">
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {session?.user?.image && (
                    <img 
                      src={session.user.image} 
                      alt="avatar" 
                      className="h-16 w-16 rounded-full border-4 border-primary shadow-lg" 
                    />
                  )}
                  <div>
                    <CardTitle className="text-3xl font-bold">
                      Welcome back, {session?.user?.name || session?.user?.email || "Learner"}! 👋
                    </CardTitle>
                    <p className="text-muted-foreground mt-1">
                      Continue your React learning journey
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {progressPercentage}% Complete
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">Overall Progress</span>
                    <span>{lessonsCompleted} of {totalLessons} lessons</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
                    <span className="font-bold text-2xl">{lessonsCompleted}</span>
                    <span className="text-sm text-muted-foreground">Lessons</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <Clock className="h-8 w-8 text-green-500 mb-2" />
                    <span className="font-bold text-2xl">{timeSpent}m</span>
                    <span className="text-sm text-muted-foreground">Time Spent</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                    <span className="font-bold text-2xl">{achievements.length}</span>
                    <span className="text-sm text-muted-foreground">Achievements</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-purple-500 mb-2" />
                    <span className="font-bold text-2xl">{streak}</span>
                    <span className="text-sm text-muted-foreground">Day Streak</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Learning Progress */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-primary" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {LESSONS.map((lesson, index) => {
                    const completed = isCompleted(lesson.id)
                    return (
                      <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                          completed 
                            ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800" 
                            : "bg-muted/50 hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {completed ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : (
                            <div className="h-6 w-6 rounded-full border-2 border-muted-foreground" />
                          )}
                          <div>
                            <h3 className="font-semibold">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {completed && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          )}
                          <Button variant="outline" size="sm" asChild>
                            <Link href={lesson.href}>
                              {completed ? "Review" : "Start"}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements & Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Achievements */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {achievements.length > 0 ? (
                  <div className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg"
                      >
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <h4 className="font-semibold text-sm">{achievement.title}</h4>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Complete lessons to unlock achievements!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/docs">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Continue Learning
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/playground">
                    <Zap className="mr-2 h-4 w-4" />
                    Practice Code
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/ai-builder">
                    <Target className="mr-2 h-4 w-4" />
                    AI Builder
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/community">
                    <User className="mr-2 h-4 w-4" />
                    Community
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
