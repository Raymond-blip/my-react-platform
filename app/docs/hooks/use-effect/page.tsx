"use client"

import { Navigation } from "@/components/navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveDemo } from "@/components/ui/interactive-demo"
import { TutorialStep } from "@/components/tutorial-step"
import { useSectionProgress } from "@/lib/hooks/useProgress"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb } from "lucide-react"

function TimerDemo() {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="text-center p-6 bg-gradient-to-r from-amber-50 to-pink-50 dark:from-amber-950/20 dark:to-pink-950/20 rounded-lg space-y-4">
      <p className="text-lg">Timer: <span className="font-bold text-2xl text-primary">{seconds}s</span></p>
      <p className="text-muted-foreground text-sm">Effect sets an interval on mount and cleans up on unmount.</p>
    </div>
  )
}

export default function UseEffectPage() {
  const { sectionProgress, markComplete } = useSectionProgress("useEffect")
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
            <h1 className="text-4xl font-bold">useEffect Hook</h1>
            <p className="text-xl text-muted-foreground">Handle side effects and lifecycle in function components.</p>
            <Button size="sm" onClick={handleMarkComplete} disabled={sectionProgress?.completed}>
              {sectionProgress?.completed ? "Completed" : "Mark as Complete"}
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary"/>Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
              <div>• Run effects after render</div>
              <div>• Declare dependencies to control when effects run</div>
              <div>• Cleanup with a return function</div>
            </CardContent>
          </Card>

          <div className="space-y-8 mb-8">
            <TutorialStep
              step={1}
              title="Basic Effect"
              content="Effects run after render. Use them for subscriptions, timers, network requests."
              code={`useEffect(() => {\n  document.title = 'Hello'\n})`}
            />
            <TutorialStep
              step={2}
              title="Dependencies"
              content="Pass an array to control when an effect runs. [] means only on mount/unmount."
              code={`useEffect(() => {\n  // runs when value changes\n}, [value])`}
            />
            <TutorialStep
              step={3}
              title="Cleanup"
              content="Return a function to clean up subscriptions or timers when deps change or on unmount."
              code={`useEffect(() => {\n  const id = setInterval(tick, 1000)\n  return () => clearInterval(id)\n}, [])`}
            />
          </div>

          <InteractiveDemo
            title="Try It Yourself: Timer"
            description="A simple timer that starts on mount and cleans up on unmount."
            code={`function Timer(){\n  const [s, setS] = useState(0)\n  useEffect(() => {\n    const id = setInterval(() => setS(v => v + 1), 1000)\n    return () => clearInterval(id)\n  }, [])\n  return <p>Timer: {s}s</p>\n}`}
            component={TimerDemo}
          />

          <div className="flex justify-between mt-10">
            <Button variant="outline" asChild>
              <Link href="/docs/hooks/use-state"><ArrowLeft className="mr-2 h-4 w-4"/>Previous</Link>
            </Button>
            <Button asChild>
              <Link href="/docs/hooks/use-context">Next: useContext<ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}


