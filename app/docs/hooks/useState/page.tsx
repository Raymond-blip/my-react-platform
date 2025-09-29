"use client"

import { Navigation } from "@/components/navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveDemo } from "@/components/ui/interactive-demo"
import { TutorialStep } from "@/components/tutorial-step"
import { useSectionProgress } from "@/lib/hooks/useProgress"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb } from "lucide-react"

function CounterDemo() {
  const [count, setCount] = useState(0)
  return (
    <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg space-y-4">
      <p className="text-lg">Count: <span className="font-bold text-2xl text-primary">{count}</span></p>
      <div className="flex justify-center gap-2">
        <Button onClick={() => setCount(c => c + 1)}>Increment</Button>
        <Button variant="outline" onClick={() => setCount(c => c - 1)}>Decrement</Button>
        <Button variant="secondary" onClick={() => setCount(0)}>Reset</Button>
      </div>
    </div>
  )
}

export default function UseStatePage() {
  const { sectionProgress, markComplete } = useSectionProgress("useState")
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
            <h1 className="text-4xl font-bold">useState Hook</h1>
            <p className="text-xl text-muted-foreground">Manage component-local, reactive state.</p>
            <Button size="sm" onClick={handleMarkComplete} disabled={sectionProgress?.completed}>
              {sectionProgress?.completed ? "Completed" : "Mark as Complete"}
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary"/>Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
              <div>• Initialize and update state with setters</div>
              <div>• Use functional updates for derived next state</div>
              <div>• Avoid mutating state directly</div>
            </CardContent>
          </Card>

          <div className="space-y-8 mb-8">
            <TutorialStep
              step={1}
              title="What is useState?"
              content="useState returns a state value and a setter. Calling the setter triggers a re-render with the new value."
              code={`import { useState } from 'react'\n\nfunction Example(){\n  const [value, setValue] = useState(0)\n  return <button onClick={() => setValue(value + 1)}>{value}</button>\n}`}
            />
            <TutorialStep
              step={2}
              title="Functional Updates"
              content="When the next state depends on the previous one, pass a function to the setter to avoid stale values."
              code={`setValue(prev => prev + 1)\nsetItems(prev => [...prev, newItem])`}
            />
            <TutorialStep
              step={3}
              title="Do not mutate state"
              content="Always create new arrays/objects when updating complex state to let React detect changes."
              code={`// Bad: arr.push(x)\n// Good: setArr(prev => [...prev, x])`}
            />
          </div>

          <InteractiveDemo
            title="Try It Yourself: Counter"
            description="Increment, decrement, and reset using useState."
            code={`function Counter(){\n  const [count, setCount] = useState(0)\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(c => c + 1)}>+1</button>\n      <button onClick={() => setCount(c => c - 1)}>-1</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  )\n}`}
            component={CounterDemo}
          />

          <div className="flex justify-between mt-10">
            <Button variant="outline" asChild>
              <Link href="/docs/fundamentals/forms"><ArrowLeft className="mr-2 h-4 w-4"/>Previous</Link>
            </Button>
            <Button asChild>
              <Link href="/docs/hooks/use-effect">Next: useEffect<ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}


