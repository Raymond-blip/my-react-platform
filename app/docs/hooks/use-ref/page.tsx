"use client"

import { Navigation } from "@/components/navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveDemo } from "@/components/ui/interactive-demo"
import { TutorialStep } from "@/components/tutorial-step"
import { useSectionProgress } from "@/lib/hooks/useProgress"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react"

function RefDemo() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const rendersRef = useRef<number>(0)
  const [, force] = useState(0)

  useEffect(() => {
    rendersRef.current = (rendersRef.current || 0) + 1
  })

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <div className="text-center p-6 bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-950/20 dark:to-sky-950/20 rounded-lg space-y-4">
      <input
        ref={inputRef}
        type="text"
        placeholder="Click the button to focus me"
        className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 w-full max-w-sm mx-auto"
      />
      <div className="flex justify-center gap-2">
        <Button onClick={focusInput}>Focus</Button>
        <Button variant="outline" onClick={() => force(v => v + 1)}>Re-render</Button>
      </div>
      <p className="text-sm text-muted-foreground">Renders (tracked in ref): {rendersRef.current}</p>
    </div>
  )
}

export default function UseRefPage() {
  const { sectionProgress, markComplete } = useSectionProgress("useRef")
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
            <h1 className="text-4xl font-bold">useRef Hook</h1>
            <p className="text-xl text-muted-foreground">Hold mutable values and access DOM nodes without causing re-renders.</p>
            <Button size="sm" onClick={handleMarkComplete} disabled={sectionProgress?.completed}>
              {sectionProgress?.completed ? "Completed" : "Mark as Complete"}
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary"/>Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
              <div>• Store values in a ref without triggering re-renders</div>
              <div>• Imperatively access DOM elements via ref</div>
              <div>• Understand ref vs state trade-offs</div>
            </CardContent>
          </Card>

          <div className="space-y-8 mb-8">
            <TutorialStep
              step={1}
              title="Mutable values"
              content="Updating a ref does not cause a re-render, useful for counters, previous values, and instance variables."
              code={`const ref = useRef(0)\nref.current += 1`}
            />
            <TutorialStep
              step={2}
              title="DOM access"
              content="Attach ref to a DOM element to call methods like focus() or measure sizes."
              code={`const el = useRef(null)\n<input ref={el} />\nel.current?.focus()`}
            />
          </div>

          <InteractiveDemo
            title="Try It Yourself: Focus & Renders"
            description="Focus an input and track renders using a ref."
            code={`function Demo(){\n  const inputRef = useRef(null)\n  const rendersRef = useRef(0)\n  const [_, force] = useState(0)\n  useEffect(()=>{ rendersRef.current++ })\n  return (<div>\n    <input ref={inputRef} />\n    <button onClick={()=> inputRef.current?.focus()}>Focus</button>\n    <button onClick={()=> force(v=>v+1)}>Re-render</button>\n    <p>Renders: {rendersRef.current}</p>\n  </div>)\n}`}
            component={RefDemo}
          />

          <div className="flex justify-between mt-10">
            <Button variant="outline" asChild>
              <Link href="/docs/hooks/use-reducer"><ArrowLeft className="mr-2 h-4 w-4"/>Previous</Link>
            </Button>
            <Button asChild>
              <Link href="/docs/hooks/use-memo">Next: useMemo<ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}


