"use client"

import { Navigation } from "@/components/navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TutorialStep } from "@/components/tutorial-step"
import { InteractiveDemo } from "@/components/ui/interactive-demo"
import { ProgressTracker } from "@/components/progress-tracker"
import Link from "next/link"

// Demo component for the interactive example
function HelloWorldComponent() {
  return (
    <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">Hello, React!</h2>
      <p className="text-gray-600 dark:text-gray-300">This is a simple React message.</p>
    </div>
  )
}

export default function IntroPage() {
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
            <h1 className="text-4xl font-bold">Introduction to React</h1>
            <p className="text-xl text-muted-foreground">Welcome to the React Fundamentals path! Start your journey here.</p>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/docs/fundamentals/first-component">Start Lesson</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/docs">Browse All Lessons</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>What you will learn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div>• What React is and when to use it</div>
                  <div>• The mental model: components, props, state</div>
                  <div>• JSX and rendering UI</div>
                  <div>• Handling events and updating state</div>
                  <div>• Lists, keys and conditional rendering</div>
                  <div>• Forms and controlled inputs</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>React in one component</CardTitle>
                </CardHeader>
                <CardContent>
                  <TutorialStep
                    step={1}
                    title="A counter component"
                    content="This shows props (label), state (count) and event handling (onClick)."
                    code={`function Counter({ label = 'Clicks' }) {
  const [count, setCount] = React.useState(0)
  return (
    <div>
      <p>{label}: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
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
                    title="Editable Counter"
                    description="Change the label and increment the counter."
                    code={`function Counter({ label = 'Clicks' }) {
  const [count, setCount] = React.useState(0)
  return (
    <div>
      <h3>{label}</h3>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  )
}

function App(){
  return <Counter label="My First Counter" />
}`}
                    component={HelloWorldComponent}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick exercise</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <div>1) Create a component that toggles text visibility with a button.</div>
                  <div>2) Add a prop for the initial visibility.</div>
                  <div>3) Bonus: Count how many times it was toggled.</div>
                </CardContent>
              </Card>
            </div>

            <div className="hidden lg:block">
              <ProgressTracker currentLesson={0} totalLessons={8} completedLessons={[]} currentPath={"intro"} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
