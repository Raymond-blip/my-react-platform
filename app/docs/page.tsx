"use client"

import { Navigation } from "@/components/navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, ArrowRight, Zap, Target } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function DocsPage() {
  const learningPaths = [
    {
      title: "React Fundamentals",
      description: "Master the core concepts of React from components to state management",
      lessons: 12,
      duration: "4 hours",
      difficulty: "Beginner",
      progress: 0,
      href: "/docs/fundamentals",
      color: "bg-blue-500",
    },
    {
      title: "Hooks Deep Dive",
      description: "Understand useState, useEffect, and custom hooks with practical examples",
      lessons: 8,
      duration: "3 hours",
      difficulty: "Intermediate",
      progress: 25,
      href: "/docs/hooks",
      color: "bg-green-500",
    },
    {
      title: "Advanced Patterns",
      description: "Learn render props, HOCs, compound components, and performance optimization",
      lessons: 10,
      duration: "5 hours",
      difficulty: "Advanced",
      progress: 60,
      href: "/docs/advanced",
      color: "bg-purple-500",
    },
    {
      title: "Testing React Apps",
      description: "Write comprehensive tests with Jest, React Testing Library, and Cypress",
      lessons: 6,
      duration: "2.5 hours",
      difficulty: "Intermediate",
      progress: 0,
      href: "/docs/testing",
      color: "bg-orange-500",
    },
  ]

  const quickStart = [
    {
      title: "Your First Component",
      description: "Create and render your first React component",
      href: "/docs/fundamentals/first-component",
      icon: Target,
    },
    {
      title: "Understanding JSX",
      description: "Learn the syntax that makes React components readable",
      href: "/docs/fundamentals/jsx",
      icon: BookOpen,
    },
    {
      title: "Props and State",
      description: "Pass data between components and manage local state",
      href: "/docs/fundamentals/props-state",
      icon: Zap,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="flex">
        <DocsSidebar />

        <main className="flex-1 container py-8 max-w-4xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mb-12">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Interactive Documentation</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Learn React through hands-on tutorials, interactive examples, and real-world projects. Track your progress
              and master React at your own pace.
            </p>
          </motion.div>

          {/* Quick Start */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {quickStart.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow group cursor-pointer" asChild>
                    <Link href={item.href}>
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{item.description}</CardDescription>
                      </CardContent>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Learning Paths */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Learning Paths</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {learningPaths.map((path, index) => (
                <motion.div
                  key={path.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${path.color}`} />
                            <CardTitle className="text-xl">{path.title}</CardTitle>
                          </div>
                          <CardDescription className="text-base">{path.description}</CardDescription>
                        </div>
                        <Badge variant="outline">{path.difficulty}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {path.lessons} lessons
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {path.duration}
                        </div>
                      </div>

                      {path.progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{path.progress}%</span>
                          </div>
                          <Progress value={path.progress} />
                        </div>
                      )}

                      <Button className="w-full group-hover:translate-x-1 transition-transform" asChild>
                        <Link href={path.href}>
                          {path.progress > 0 ? "Continue Learning" : "Start Learning"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Stats */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/10">
              <CardContent className="p-8">
                <div className="grid gap-8 md:grid-cols-3 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">50+</div>
                    <div className="text-muted-foreground">Interactive Lessons</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                    <div className="text-muted-foreground">Code Examples</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">10k+</div>
                    <div className="text-muted-foreground">Students Learning</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </main>
      </div>
    </div>
  )
}
