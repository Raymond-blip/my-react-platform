"use client"

import { Navigation } from "@/components/navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, ArrowRight, CheckCircle, PlayCircle, Zap, Code, MousePointer, List, ToggleLeft, Settings, Layers, Gauge } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AdvancedPage() {
  const lessons = [
    {
      id: "render-props",
      title: "Render Props Pattern",
      description: "Share code between components using render props",
      duration: "20 min",
      completed: false,
      href: "/docs/advanced/render-props",
      icon: Code,
    },
    {
      id: "higher-order-components",
      title: "Higher-Order Components",
      description: "Create reusable component logic with HOCs",
      duration: "25 min",
      completed: false,
      href: "/docs/advanced/higher-order-components",
      icon: Layers,
    },
    {
      id: "compound-components",
      title: "Compound Components",
      description: "Build flexible component APIs with compound patterns",
      duration: "30 min",
      completed: false,
      href: "/docs/advanced/compound-components",
      icon: Settings,
    },
    {
      id: "context-patterns",
      title: "Advanced Context Patterns",
      description: "Master context for global state management",
      duration: "35 min",
      completed: false,
      href: "/docs/advanced/context-patterns",
      icon: Zap,
    },
    {
      id: "performance-optimization",
      title: "Performance Optimization",
      description: "Optimize React apps for better performance",
      duration: "40 min",
      completed: false,
      href: "/docs/advanced/performance-optimization",
      icon: Gauge,
    },
    {
      id: "error-boundaries",
      title: "Error Boundaries",
      description: "Handle errors gracefully in React applications",
      duration: "20 min",
      completed: false,
      href: "/docs/advanced/error-boundaries",
      icon: ToggleLeft,
    },
    {
      id: "code-splitting",
      title: "Code Splitting",
      description: "Split your code for better loading performance",
      duration: "25 min",
      completed: false,
      href: "/docs/advanced/code-splitting",
      icon: List,
    },
    {
      id: "suspense",
      title: "React Suspense",
      description: "Handle async operations with Suspense",
      duration: "30 min",
      completed: false,
      href: "/docs/advanced/suspense",
      icon: PlayCircle,
    },
    {
      id: "concurrent-features",
      title: "Concurrent Features",
      description: "Explore React 18's concurrent features",
      duration: "35 min",
      completed: false,
      href: "/docs/advanced/concurrent-features",
      icon: Zap,
    },
    {
      id: "server-components",
      title: "Server Components",
      description: "Build with React Server Components",
      duration: "40 min",
      completed: false,
      href: "/docs/advanced/server-components",
      icon: Code,
    },
  ]

  const totalLessons = lessons.length
  const completedLessons = lessons.filter(lesson => lesson.completed).length
  const progress = (completedLessons / totalLessons) * 100

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex">
        <DocsSidebar />
        
        <main className="flex-1 container py-8 max-w-4xl">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-4 mb-8"
          >
            <div className="flex items-center gap-2">
              <Badge variant="outline">Advanced</Badge>
              <Badge variant="destructive">Advanced</Badge>
            </div>
            <h1 className="text-4xl font-bold">Advanced React Patterns</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Master advanced React patterns, performance optimization techniques, and modern React features. Take your React skills to the next level.
            </p>
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Your Progress</h2>
                  <span className="text-sm text-muted-foreground">
                    {completedLessons} of {totalLessons} lessons completed
                  </span>
                </div>
                <Progress value={progress} className="mb-4" />
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    ~5 hours total
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {totalLessons} lessons
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Lessons List */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">Lessons</h2>
            <div className="space-y-4">
              {lessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="hover:shadow-lg transition-shadow group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            {lesson.completed ? (
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            ) : (
                              <lesson.icon className="h-6 w-6 text-primary" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{lesson.title}</CardTitle>
                            <CardDescription>{lesson.description}</CardDescription>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {lesson.duration}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {lesson.completed && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          )}
                          <Button variant="outline" size="sm" asChild>
                            <Link href={lesson.href}>
                              {lesson.completed ? "Review" : "Start"}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Next Steps */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">What's Next?</h3>
                <p className="text-muted-foreground mb-4">
                  You're becoming a React expert! Consider learning testing strategies to build robust applications.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href="/docs/testing">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Testing React Apps
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/playground">
                      <Zap className="mr-2 h-4 w-4" />
                      Practice in Playground
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </main>
      </div>
    </div>
  )
}