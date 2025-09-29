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
function ConditionalDemoComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [itemCount, setItemCount] = useState(0)

  return (
    <div className="text-center p-6 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 rounded-lg space-y-4">
      <p className="text-lg font-semibold">
        {isLoggedIn ? "Welcome back!" : "Please log in."}
      </p>

      {isAdmin && <Badge className="bg-purple-500">Admin User</Badge>}

      {itemCount > 0 && (
        <p>You have {itemCount} items in your cart.</p>
      )}
      {itemCount === 0 && (
        <p>Your cart is empty.</p>
      )}

      <div className="flex justify-center gap-2">
        <Button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? "Log Out" : "Log In"}
        </Button>
        <Button variant="outline" onClick={() => setIsAdmin(!isAdmin)}>
          Toggle Admin
        </Button>
        <Button variant="secondary" onClick={() => setItemCount(prev => prev + 1)}>
          Add Item ({itemCount})
        </Button>
      </div>
    </div>
  )
}

export default function ConditionalPage() {
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
            <h1 className="text-4xl font-bold">Conditional Rendering</h1>
            <p className="text-xl text-muted-foreground">Render different UI based on conditions in your React components.</p>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/docs/fundamentals/lists">Next: Lists & Keys</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/docs/fundamentals/events">Previous: Events</Link>
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
                  <div>• Render based on booleans, ternaries, and logical &&</div>
                  <div>• Avoid deeply nested conditionals with early returns</div>
                  <div>• Extract conditional blocks into small components</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <TutorialStep
                    step={1}
                    title="Ternary for small differences"
                    content="Choose between two small elements."
                    code={`function Status({ online }){
  return <span>{online ? 'Online' : 'Offline'}</span>
}`}
                  />
                  <TutorialStep
                    step={2}
                    title="Logical && for optional blocks"
                    content="Render a block only when condition is true."
                    code={`{items.length > 0 && <List items={items} />}`}
                  />
                  <TutorialStep
                    step={3}
                    title="Guard clauses / early returns"
                    content="Return early to avoid nesting."
                    code={`function Dashboard({ user }){
  if (!user) return <LoginPrompt />
  return <Main />
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
                    title="Auth Gate"
                    description="Toggle a fake user and render different UI."
                    code={`function AuthGate(){
  const [user, setUser] = React.useState(null)
  return (
    <div>
      <button onClick={() => setUser(user ? null : { name: 'Ayo' })}>
        {user ? 'Sign out' : 'Sign in'}
      </button>
      {user ? <p>Welcome, {user.name}</p> : <p>Please sign in</p>}
    </div>
  )
}

function App(){
  return <AuthGate />
}`}
                    component={ConditionalDemoComponent}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exercises</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <div>1) Show an alert banner only when there are errors.</div>
                  <div>2) Switch between grid and list views with a toggle.</div>
                  <div>3) Return early when data is loading or missing.</div>
                </CardContent>
              </Card>
            </div>

            <div className="hidden lg:block">
              <ProgressTracker currentLesson={6} totalLessons={8} completedLessons={[]} currentPath={"conditional"} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
