"use client"

import { Navigation } from "@/components/navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, ArrowRight, CheckCircle, PlayCircle, Target, Zap, Code, MousePointer, List, ToggleLeft } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useProgress } from "@/lib/hooks/useProgress"

export default function FundamentalsPage() {
  const { progress: userProgress, stats, markComplete, isCompleted } = useProgress()
  const lessons = [
    {
      id: "intro",
      title: "Introduction to React",
      description: "What is React and why should you learn it?",
      duration: "5 min",
      completed: false,
      href: "/docs/fundamentals/intro",
      icon: BookOpen,
    },
    {
      id: "first-component",
      title: "Your First Component",
      description: "Create and render your first React component",
      duration: "10 min",
      completed: false,
      href: "/docs/fundamentals/first-component",
      icon: Target,
    },
    {
      id: "jsx",
      title: "Understanding JSX",
      description: "Learn the syntax that makes React components readable",
      duration: "15 min",
      completed: false,
      href: "/docs/fundamentals/jsx",
      icon: Code,
    },
    {
      id: "props-state",
      title: "Props and State",
      description: "Pass data between components and manage local state",
      duration: "20 min",
      completed: false,
      href: "/docs/fundamentals/props-state",
      icon: Zap,
    },
    {
      id: "events",
      title: "Event Handling",
      description: "Handle user interactions and events in React",
      duration: "15 min",
      completed: false,
      href: "/docs/fundamentals/events",
      icon: MousePointer,
    },
    {
      id: "conditional",
      title: "Conditional Rendering",
      description: "Show and hide components based on conditions",
      duration: "12 min",
      completed: false,
      href: "/docs/fundamentals/conditional",
      icon: ToggleLeft,
    },
    {
      id: "lists",
      title: "Lists and Keys",
      description: "Render lists of data efficiently with proper keys",
      duration: "18 min",
      completed: false,
      href: "/docs/fundamentals/lists",
      icon: List,
    },
    {
      id: "forms",
      title: "Forms and Input",
      description: "Handle form inputs and user data",
      duration: "25 min",
      completed: false,
      href: "/docs/fundamentals/forms",
      icon: BookOpen,
    },
  ]

  const totalLessons = lessons.length
  const completedLessons = lessons.filter(lesson => isCompleted(lesson.id)).length
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
              <Badge variant="outline">Fundamentals</Badge>
              <Badge variant="secondary">Beginner</Badge>
            </div>
            <h1 className="text-4xl font-bold">React Fundamentals</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Master the core concepts of React from components to state management. This path will take you from zero to building your first React applications.
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
                    ~2 hours total
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
                            {isCompleted(lesson.id) ? (
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
                          {isCompleted(lesson.id) && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          )}
                          <Button variant="outline" size="sm" asChild>
                            <Link href={lesson.href}>
                              {isCompleted(lesson.id) ? "Review" : "Start"}
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
                  Once you complete the fundamentals, you'll be ready to dive deeper into React with our Hooks and Advanced Patterns courses.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href="/docs/hooks">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Hooks Deep Dive
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/docs/advanced">
                      <Zap className="mr-2 h-4 w-4" />
                      Advanced Patterns
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
