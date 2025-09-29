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
function JsxDemoComponent() {
  const name = "Learner"
  const element = <h2>Hello, {name}!</h2>
  const sum = 5 + 5
  const isActive = true

  return (
    <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg space-y-2">
      {element}
      <p>The sum of 5 + 5 is: {sum}</p>
      {isActive && <p className="text-green-600 dark:text-green-400">You are active!</p>}
      {!isActive && <p className="text-red-600 dark:text-red-400">You are inactive.</p>}
    </div>
  )
}

export default function JsxPage() {
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
            <h1 className="text-4xl font-bold">Understanding JSX</h1>
            <p className="text-xl text-muted-foreground">JSX lets you write HTML-like syntax in JavaScript. It's a core part of React.</p>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/docs/fundamentals/props-state">Next: Props & State</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/docs/fundamentals/intro">Previous: Intro</Link>
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
                  <div>• Understand JSX syntax and expressions</div>
                  <div>• Differences from HTML (className, camelCase props)</div>
                  <div>• Embedding JavaScript and rendering lists</div>
                  <div>• JSX rules: one parent, fragments, escape XSS</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>JSX Essentials</CardTitle>
                </CardHeader>
                <CardContent>
                  <TutorialStep
                    step={1}
                    title="Expressions in JSX"
                    content="You can embed any JS expression inside curly braces."
                    code={`function Greeting({ name }){
  return <h2>Hello, {name.toUpperCase()}!</h2>
}`}
                  />
                  <TutorialStep
                    step={2}
                    title="Attributes and className"
                    content="Use camelCase for attributes and className instead of class."
                    code={`<div className="box" tabIndex={0} aria-label="greeting">Hi</div>`}
                  />
                  <TutorialStep
                    step={3}
                    title="Fragments & single parent"
                    content="Wrap siblings with a single parent or use <>...</>."
                    code={`function List(){
  const items = ['a','b','c']
  return (
    <>
      {items.map(item => <span key={item}>{item}</span>)}
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
                    title="User Card"
                    description="Render a user card using expressions and props."
                    code={`function UserCard({ user }){
  return (
    <div className="p-3 border rounded">
      <h3>{user.name}</h3>
      <p>Followers: {user.followers}</p>
    </div>
  )
}

function App(){
  return <UserCard user={{ name: 'Ayo', followers: 120 }} />
}`}
                    component={JsxDemoComponent}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exercises</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <div>1) Create a list of products using map and keys.</div>
                  <div>2) Add conditional rendering: show “Sale!” when price &lt; 20.</div>
                  <div>3) Replace wrappers with fragments where appropriate.</div>
                </CardContent>
              </Card>
            </div>

            <div className="hidden lg:block">
              <ProgressTracker currentLesson={3} totalLessons={8} completedLessons={[]} currentPath={"jsx"} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
