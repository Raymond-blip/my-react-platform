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
function EventDemoComponent() {
  const [message, setMessage] = useState("Click a button!")

  const handleClick = () => {
    setMessage("Button clicked!")
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(`Input changed: ${event.target.value}`)
  }

  const handleMouseOver = () => {
    setMessage("Mouse over the box!")
  }

  const handleMouseOut = () => {
    setMessage("Mouse left the box.")
  }

  return (
    <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-lg space-y-4">
      <p className="text-lg font-semibold">{message}</p>
      <div className="flex justify-center gap-2">
        <Button onClick={handleClick}>Click Me</Button>
        <input
          type="text"
          placeholder="Type here..."
          className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          onChange={handleInputChange}
        />
      </div>
      <div
        className="mt-4 p-8 bg-blue-100 dark:bg-blue-900/20 rounded-md cursor-pointer"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <p>Hover over me!</p>
      </div>
    </div>
  )
}

export default function EventsPage() {
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
            <h1 className="text-4xl font-bold">Event Handling</h1>
            <p className="text-xl text-muted-foreground">Handle user interactions and events in React.</p>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/docs/fundamentals/conditional">Next: Conditional Rendering</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/docs/fundamentals/props-state">Previous: Props & State</Link>
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
                  <div>• Attach event handlers and access the event object</div>
                  <div>• Update state in response to user actions</div>
                  <div>• Prevent default/stop propagation when needed</div>
                  <div>• Understand synthetic events and performance tips</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Handling Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <TutorialStep
                    step={1}
                    title="Click events"
                    content="Use onClick with a function to update state."
                    code={`function ButtonLike(){
  const [liked, setLiked] = React.useState(false)
  return <button onClick={() => setLiked(!liked)}>{liked ? 'Liked' : 'Like'}</button>
}`}
                  />
                  <TutorialStep
                    step={2}
                    title="Form submission"
                    content="Use onSubmit and preventDefault to handle forms."
                    code={`function Form(){
  const [value, setValue] = React.useState('')
  function handleSubmit(e){
    e.preventDefault()
    alert('Submitted: ' + value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  )
}`}
                  />
                  <TutorialStep
                    step={3}
                    title="Keyboard and change events"
                    content="React normalizes events; handlers receive a synthetic event."
                    code={`<input onKeyDown={(e) => e.key === 'Enter' && console.log('Enter')} onChange={(e) => console.log(e.target.value)} />`}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Try it yourself</CardTitle>
                </CardHeader>
                <CardContent>
                  <InteractiveDemo
                    title="Like & Comment"
                    description="Toggle like and submit a simple comment."
                    code={`function Widget(){
  const [liked, setLiked] = React.useState(false)
  const [comment, setComment] = React.useState('')
  function handleSubmit(e){
    e.preventDefault()
    alert('Comment: ' + comment)
    setComment('')
  }
  return (
    <div>
      <button onClick={() => setLiked(!liked)}>{liked ? 'Unlike' : 'Like'}</button>
      <form onSubmit={handleSubmit}>
        <input value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Type a comment" />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

function App(){
  return <Widget />
}`}
                    component={EventDemoComponent}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exercises</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <div>1) Build a rating widget with 5 stars and click handlers.</div>
                  <div>2) Create a form with validation; disable button when invalid.</div>
                  <div>3) Bonus: Stop propagation on a nested clickable element.</div>
                </CardContent>
              </Card>
            </div>

            <div className="hidden lg:block">
              <ProgressTracker currentLesson={5} totalLessons={8} completedLessons={[]} currentPath={"events"} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
