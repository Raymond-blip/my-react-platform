"use client"

import { Navigation } from "@/components/navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TutorialStep } from "@/components/tutorial-step"
import { InteractiveDemo } from "@/components/ui/interactive-demo"
import { ProgressTracker } from "@/components/progress-tracker"
import { useState } from "react"
import Link from "next/link"

// Demo component for the interactive example
function CounterComponent() {
  const [count, setCount] = useState(0)
  return (
    <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg space-y-4">
      <p className="text-lg">Count: <span className="font-bold text-2xl text-primary">{count}</span></p>
      <div className="flex justify-center gap-2">
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
        <Button variant="outline" onClick={() => setCount(count - 1)}>Decrement</Button>
      </div>
    </div>
  )
}

export default function PropsStatePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <DocsSidebar />
        <main className="flex-1 container py-8 max-w-4xl">
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Fundamentals</Badge>
              <Badge variant="secondary">Beginner</Badge>
            </div>
            <h1 className="text-4xl font-bold">Props and State</h1>
            <p className="text-xl text-muted-foreground">Learn how to pass data and manage state in your React components.</p>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/docs/fundamentals/events">Next: Events</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/docs/fundamentals/jsx">Previous: JSX</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Objectives</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <div>• Understand the difference between props and state</div>
                  <div>• Pass props down and update state with setters</div>
                  <div>• Avoid common pitfalls (mutating state, prop drilling)</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Props vs State</CardTitle>
                </CardHeader>
                <CardContent>
                  <TutorialStep
                    step={1}
                    title="Props are inputs"
                    content="Props are read-only values passed from parent to child."
                    code={`function Welcome({ name }){
  return <h2>Hello, {name}</h2>
}

function App(){
  return <Welcome name="Ayo" />
}`}
                  />
                  <TutorialStep
                    step={2}
                    title="State is internal and mutable (via setter)"
                    content="Use useState for values that change over time."
                    code={`function Counter(){
  const [count, setCount] = React.useState(0)
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}`}
                  />
                  <TutorialStep
                    step={3}
                    title="Derived state and lifting state up"
                    content="Compute values from state/props and lift state to a common parent when needed."
                    code={`function Parent(){
  const [value, setValue] = React.useState('')
  return (
    <>
      <Input value={value} onChange={setValue} />
      <Preview value={value} />
    </>
  )
}`}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Try it yourself</CardTitle>
                </CardHeader>
                <CardContent>
                  <InteractiveDemo
                    title="Controlled Input"
                    description="Type into the input and see the preview update."
                    code={`function Controlled(){
  const [text, setText] = React.useState('')
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>Preview: {text || 'Start typing...'}</p>
    </div>
  )
}

function App(){
  return <Controlled />
}`}
                    component={CounterComponent}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exercises</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <div>1) Build a Todo item with props (text, completed) and a local toggle state.</div>
                  <div>2) Lift state: manage a Todo list in a parent component and pass handlers down.</div>
                  <div>3) Bonus: Derive a remaining count from state instead of storing it.</div>
                </CardContent>
              </Card>
            </div>

            <div className="hidden lg:block">
              <ProgressTracker currentLesson={4} totalLessons={8} completedLessons={[]} currentPath={"props-state"} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
