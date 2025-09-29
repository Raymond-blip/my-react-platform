"use client"

import { Navigation } from "@/components/navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveDemo } from "@/components/ui/interactive-demo"
import { TutorialStep } from "@/components/tutorial-step"
import { useSectionProgress } from "@/lib/hooks/useProgress"
import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react"

function ExpensiveCalcDemo() {
  const [a, setA] = useState(1000)
  const [b, setB] = useState(2000)
  const [multiplier, setMultiplier] = useState(2)

  const sum = useMemo(() => {
    // simulate an expensive calc
    let total = 0
    for (let i = 0; i < 300000; i++) total += (a + b) * multiplier
    return total
  }, [a, b, multiplier])

  return (
    <div className="text-center p-6 bg-gradient-to-r from-lime-50 to-emerald-50 dark:from-lime-950/20 dark:to-emerald-950/20 rounded-lg space-y-4">
      <div className="flex gap-2 justify-center">
        <input type="number" value={a} onChange={e => setA(Number(e.target.value))} className="p-2 border rounded-md w-28"/>
        <input type="number" value={b} onChange={e => setB(Number(e.target.value))} className="p-2 border rounded-md w-28"/>
        <input type="number" value={multiplier} onChange={e => setMultiplier(Number(e.target.value))} className="p-2 border rounded-md w-28"/>
      </div>
      <p className="text-sm text-muted-foreground">Memoized sum: {sum}</p>
    </div>
  )
}

export default function UseMemoPage() {
  const { sectionProgress, markComplete } = useSectionProgress("useMemo")
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
            <h1 className="text-4xl font-bold">useMemo Hook</h1>
            <p className="text-xl text-muted-foreground">Memoize expensive calculations to avoid unnecessary recomputation.</p>
            <Button size="sm" onClick={handleMarkComplete} disabled={sectionProgress?.completed}>
              {sectionProgress?.completed ? "Completed" : "Mark as Complete"}
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary"/>Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
              <div>• Cache expensive computed values</div>
              <div>• Understand dependency arrays</div>
              <div>• Avoid premature optimization</div>
            </CardContent>
          </Card>

          <div className="space-y-8 mb-8">
            <TutorialStep
              step={1}
              title="When to use"
              content="Only memoize when a computation is expensive and inputs rarely change."
              code={`const value = useMemo(() => expensive(x, y), [x, y])`}
            />
            <TutorialStep
              step={2}
              title="Dependencies"
              content="Keep the dependency list accurate; include everything used inside the memo callback."
              code={`useMemo(() => f(a, b), [a, b])`}
            />
          </div>

          <InteractiveDemo
            title="Try It Yourself: Expensive Sum"
            description="Change inputs and multiplier to see memoization in action."
            code={`function Demo(){\n  const [a,setA] = useState(1000); const [b,setB] = useState(2000); const [m,setM] = useState(2)\n  const sum = useMemo(() => heavy(a,b,m), [a,b,m])\n  return <div>Sum: {sum}</div>\n}`}
            component={ExpensiveCalcDemo}
          />

          <div className="flex justify-between mt-10">
            <Button variant="outline" asChild>
              <Link href="/docs/hooks/use-ref"><ArrowLeft className="mr-2 h-4 w-4"/>Previous</Link>
            </Button>
            <Button asChild>
              <Link href="/docs/hooks/use-callback">Next: useCallback<ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}


