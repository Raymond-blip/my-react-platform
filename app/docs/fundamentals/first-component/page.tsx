"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { TutorialStep } from "@/components/tutorial-step"
import { InteractiveDemo } from "@/components/ui/interactive-demo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProgressTracker } from "@/components/progress-tracker"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSectionProgress } from "@/lib/hooks/useProgress"

// Demo component for the interactive example
function WelcomeComponent() {
  return (
    <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">Welcome to React!</h2>
      <p className="text-gray-600 dark:text-gray-300">This is your first React component</p>
    </div>
  )
}

export default function FirstComponentPage() {
  const { sectionProgress, markComplete } = useSectionProgress("first-component")
  const [startTime] = useState(Date.now())
  
  const steps = [
    {
      title: "What is a React Component?",
      content:
        "A React component is a reusable piece of UI that can contain its own logic and state. Think of it as a custom HTML element that you can use throughout your application.",
      code: `// This is a React component
function Welcome() {
  return <h1>Hello, World!</h1>;
}`,
    },
    {
      title: "Creating Your First Component",
      content:
        "Let's create a simple Welcome component. Components are just JavaScript functions that return JSX (a syntax extension for JavaScript that looks like HTML).",
      code: `function Welcome() {
  return (
    <div>
      <h2>Welcome to React!</h2>
      <p>This is your first component</p>
    </div>
  );
}`,
    },
    {
      title: "Using Your Component",
      content:
        "Once you've created a component, you can use it anywhere in your application by writing it like an HTML tag. Component names must start with a capital letter.",
      code: `function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
      <Welcome />
    </div>
  );
}`,
    },
  ]

  // Progress tracking
  const LESSON_ID = "first-component"
  const TOTAL_LESSONS = 8
  const [completedLessons, setCompletedLessons] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("completedLessons")
    if (stored) setCompletedLessons(JSON.parse(stored))
  }, [])

  const handleMarkComplete = async () => {
    const timeSpent = Math.round((Date.now() - startTime) / 60000) // Convert to minutes
    await markComplete(timeSpent)
    
    // Also update local storage for backward compatibility
    if (!completedLessons.includes(LESSON_ID)) {
      const updated = [...completedLessons, LESSON_ID]
      setCompletedLessons(updated)
      localStorage.setItem("completedLessons", JSON.stringify(updated))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <DocsSidebar />
        <div className="flex flex-1">
          <main className="flex-1 container py-8 max-w-4xl">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mb-8">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Fundamentals</Badge>
                <Badge variant="secondary">Beginner</Badge>
              </div>
              <h1 className="text-4xl font-bold">Your First Component</h1>
              <p className="text-xl text-muted-foreground">Learn how to create and use your first React component</p>
              <div className="flex items-center gap-4">
                <ProgressTracker currentLesson={1} totalLessons={TOTAL_LESSONS} completedLessons={completedLessons} currentPath={LESSON_ID} />
                <Button size="sm" onClick={handleMarkComplete} disabled={sectionProgress?.completed || completedLessons.includes(LESSON_ID)}>
                  {sectionProgress?.completed || completedLessons.includes(LESSON_ID) ? "Completed" : "Mark as Complete"}
                </Button>
              </div>
            </motion.div>

          {/* Tutorial Steps */}
          <div className="space-y-8 mb-8">
            {steps.map((step, index) => (
              <TutorialStep key={index} step={index + 1} title={step.title} content={step.content} code={step.code} />
            ))}
          </div>

          {/* Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <InteractiveDemo
              title="Try It Yourself"
              description="See your first React component in action"
              code={`function Welcome() {
  return (
    <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
        Welcome to React!
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        This is your first React component
      </p>
    </div>
  );
}`}
              component={WelcomeComponent}
            />
          </motion.div>

          {/* Key Takeaways */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Key Takeaways
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p>React components are JavaScript functions that return JSX</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p>Component names must start with a capital letter</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p>Components can be reused multiple times throughout your app</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p>JSX allows you to write HTML-like syntax in JavaScript</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/docs/fundamentals/intro">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Introduction
              </Link>
            </Button>
            <Button asChild>
              <Link href="/docs/fundamentals/jsx">
                Next: Understanding JSX
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          </main>
        </div>
      </div>
    </div>
  )
}
