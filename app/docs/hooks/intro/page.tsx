"use client"

import { Navigation } from "@/components/navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TutorialStep } from "@/components/tutorial-step"
import { InteractiveDemo } from "@/components/ui/interactive-demo"
import { useSectionProgress } from "@/lib/hooks/useProgress"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle } from "lucide-react"

function DemoComponent() {
  const [count, setCount] = useState(0)
  return (
    <div className="text-center p-6 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950/20 dark:to-blue-950/20 rounded-lg space-y-4">
      <p className="text-lg">Count: <span className="font-bold text-2xl text-primary">{count}</span></p>
      <div className="flex justify-center gap-2">
        <Button onClick={() => setCount(c => c + 1)}>Increment</Button>
        <Button variant="outline" onClick={() => setCount(0)}>Reset</Button>
      </div>
    </div>
  )
}

export default function HooksIntroPage() {
  const { sectionProgress, markComplete } = useSectionProgress("hooks-intro")
  const [startTime] = useState(Date.now())

  const handleMarkComplete = async () => {
    const timeSpent = Math.round((Date.now() - startTime) / 60000)
    await markComplete(timeSpent)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <DocsSidebar />
        <main className="flex-1 container py-8 max-w-4xl">
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Hooks</Badge>
              <Badge variant="secondary">Intermediate</Badge>
            </div>
            <h1 className="text-4xl font-bold">Introduction to Hooks</h1>
            <p className="text-xl text-muted-foreground">
              Hooks let you use state and other React features without writing classes. They make logic reusable and components simpler.
            </p>
            <Button size="sm" onClick={handleMarkComplete} disabled={sectionProgress?.completed}>
              {sectionProgress?.completed ? "Completed" : "Mark as Complete"}
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary"/>What you'll learn</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
              <div>• Why hooks exist and how they replace many class patterns</div>
              <div>• Core hooks: useState, useEffect, useContext</div>
              <div>• Advanced hooks: useReducer, useRef, useMemo, useCallback</div>
              <div>• Creating and sharing custom hooks</div>
            </CardContent>
          </Card>

          <div className="space-y-8 mb-8">
            <TutorialStep
              step={1}
              title="Motivation"
              content="Hooks solve problems like logic reuse between components and complex lifecycle methods in classes."
              code={`// Before hooks, logic reuse required patterns like render props or HOCs.\n// With hooks, you can extract reusable logic into functions.`}
            />
            <TutorialStep
              step={2}
              title="Rules of Hooks"
              content="Call hooks at the top level of your component and only from React functions (components or custom hooks)."
              code={`// ✅ Good\nfunction Component(){\n  const [v, setV] = useState(0)\n}\n\n// ❌ Bad\nif (cond) { useState(0) }`}
            />
          </div>

          <InteractiveDemo
            title="Try It Yourself: First Hook"
            description="A tiny counter using a hook in a function component."
            code={`function Demo(){\n  const [count, setCount] = useState(0)\n  return (<div>\n    <p>Count: {count}</p>\n    <button onClick={() => setCount(c => c + 1)}>+1</button>\n  </div>)\n}`}
            component={DemoComponent}
          />

          <div className="flex justify-between mt-10">
            <Button variant="outline" asChild>
              <Link href="/docs/fundamentals/forms"><ArrowLeft className="mr-2 h-4 w-4"/>Back to Fundamentals</Link>
            </Button>
            <Button asChild>
              <Link href="/docs/hooks/use-state">Next: useState<ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}


