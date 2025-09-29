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
function SignupFormDemo() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const valid = email.includes('@') && password.length >= 6 && password === confirmPassword
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (valid) {
      alert('Account created successfully!')
    }
  }

  return (
    <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            placeholder="At least 6 characters"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            placeholder="Confirm your password"
          />
          {password && confirmPassword && password !== confirmPassword && (
            <p className="text-red-500 text-xs mt-1">Passwords don't match</p>
          )}
        </div>
        <Button 
          type="submit" 
          disabled={!valid}
          className="w-full"
        >
          {valid ? 'Create Account' : 'Fill all fields correctly'}
        </Button>
      </form>
    </div>
  )
}

export default function FormsPage() {
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
            <h1 className="text-4xl font-bold">Forms</h1>
            <p className="text-xl text-muted-foreground">Build and manage forms in React.</p>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/docs/fundamentals/intro">Back to Start</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/docs/fundamentals/lists">Previous: Lists & Keys</Link>
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
                  <div>• Controlled components and onChange</div>
                  <div>• Handling multiple fields and derived validation</div>
                  <div>• Basic accessibility: label, id, aria-*</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Controlled Inputs</CardTitle>
                </CardHeader>
                <CardContent>
                  <TutorialStep
                    step={1}
                    title="Text input"
                    content="Bind value to state and update via onChange."
                    code={`function NameForm(){\n  const [name, setName] = React.useState('')\n  return (\n    <label>\n      Name\n      <input value={name} onChange={(e)=>setName(e.target.value)} />\n    </label>\n  )\n}`}
                  />
                  <TutorialStep
                    step={2}
                    title="Checkbox & Select"
                    content="Different input types still use value/checked and onChange."
                    code={`<input type=\"checkbox\" checked={done} onChange={(e)=>setDone(e.target.checked)} />\n<select value={role} onChange={(e)=>setRole(e.target.value)}></select>`}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Try it yourself</CardTitle>
                </CardHeader>
                <CardContent>
                  <InteractiveDemo
                    title="Signup Form"
                    description="Validate required fields and disable submit until valid."
                    code={`function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const valid = email.includes('@') && password.length >= 6 && password === confirmPassword
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (valid) {
      alert('Account created successfully!')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />
        {password && confirmPassword && password !== confirmPassword && (
          <p className="text-red-500 text-xs">Passwords don't match</p>
        )}
      </div>
      <button type="submit" disabled={!valid}>
        {valid ? 'Create Account' : 'Fill all fields correctly'}
      </button>
    </form>
  )
}`}
                    component={SignupFormDemo}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exercises</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <div>1) Add confirm password and show a mismatch message.</div>
                  <div>2) Extract an &lt;InputField&gt; component that forwards props.</div>
                  <div>3) Bonus: Persist form draft in localStorage.</div>
                </CardContent>
              </Card>
            </div>

            <div className="hidden lg:block">
              <ProgressTracker currentLesson={8} totalLessons={8} completedLessons={[]} currentPath={"forms"} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
