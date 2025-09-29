"use client"

import { Navigation } from "@/components/navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveDemo } from "@/components/ui/interactive-demo"
import { TutorialStep } from "@/components/tutorial-step"
import { useSectionProgress } from "@/lib/hooks/useProgress"
import { useReducer, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react"

type CounterAction = { type: "inc" } | { type: "dec" } | { type: "reset" }
function counterReducer(state: number, action: CounterAction) {
  switch (action.type) {
    case "inc":
      return state + 1
    case "dec":
      return state - 1
    case "reset":
      return 0
    default:
      return state
  }
}

function ReducerDemo() {
  const [count, dispatch] = useReducer(counterReducer, 0)
  return (
    <div className="text-center p-6 bg-gradient-to-r from-fuchsia-50 to-rose-50 dark:from-fuchsia-950/20 dark:to-rose-950/20 rounded-lg space-y-4">
      <p className="text-lg">Count: <span className="font-bold text-2xl text-primary">{count}</span></p>
      <div className="flex justify-center gap-2">
        <Button onClick={() => dispatch({ type: "inc" })}>Increment</Button>
        <Button variant="outline" onClick={() => dispatch({ type: "dec" })}>Decrement</Button>
        <Button variant="secondary" onClick={() => dispatch({ type: "reset" })}>Reset</Button>
      </div>
    </div>
  )
}

export default function UseReducerPage() {
  const { sectionProgress, markComplete } = useSectionProgress("useReducer")
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
            <h1 className="text-4xl font-bold">useReducer Hook</h1>
            <p className="text-xl text-muted-foreground">Manage complex state transitions with reducers and actions.</p>
            <Button size="sm" onClick={handleMarkComplete} disabled={sectionProgress?.completed}>
              {sectionProgress?.completed ? "Completed" : "Mark as Complete"}
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary"/>Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
              <div>• Compare useReducer vs useState</div>
              <div>• Define reducer, action types, and dispatch updates</div>
              <div>• Co-locate complex update logic outside component body</div>
            </CardContent>
          </Card>

          <div className="space-y-8 mb-8">
            <TutorialStep
              step={1}
              title="Basic reducer"
              content="Reducers are pure functions that receive (state, action) and return next state."
              code={`function reducer(state, action){\n  switch(action.type){\n    case 'add': return { ...state, count: state.count + 1 }\n    default: return state\n  }\n}`}
            />
            <TutorialStep
              step={2}
              title="Dispatching actions"
              content="Call dispatch({type, payload}) to trigger state transitions."
              code={`const [state, dispatch] = useReducer(reducer, initial)\ndispatch({ type: 'add' })`}
            />
          </div>

          <InteractiveDemo
            title="Try It Yourself: Reducer Counter"
            description="Increment, decrement, reset via reducer actions."
            code={`function counterReducer(state, action){\n  switch(action.type){\n    case 'inc': return state + 1\n    case 'dec': return state - 1\n    case 'reset': return 0\n    default: return state\n  }\n}\n\nfunction Demo(){\n  const [count, dispatch] = useReducer(counterReducer, 0)\n  return (<div>\n    <p>Count: {count}</p>\n    <button onClick={() => dispatch({type:'inc'})}>+1</button>\n    <button onClick={() => dispatch({type:'dec'})}>-1</button>\n    <button onClick={() => dispatch({type:'reset'})}>Reset</button>\n  </div>)\n}`}
            component={ReducerDemo}
          />

          <div className="flex justify-between mt-10">
            <Button variant="outline" asChild>
              <Link href="/docs/hooks/use-context"><ArrowLeft className="mr-2 h-4 w-4"/>Previous</Link>
            </Button>
            <Button asChild>
              <Link href="/docs/hooks/use-ref">Next: useRef<ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}


