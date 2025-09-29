"use client"

import { Navigation } from "@/components/navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveDemo } from "@/components/ui/interactive-demo"
import { TutorialStep } from "@/components/tutorial-step"
import { useSectionProgress } from "@/lib/hooks/useProgress"
import { memo, useCallback, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react"

const Child = memo(function Child({ onAdd }: { onAdd: () => void }) {
  return (
    <Button onClick={onAdd}>Add Item</Button>
  )
})

function CallbackDemo() {
  const [items, setItems] = useState<string[]>([])
  const onAdd = useCallback(() => setItems(prev => [...prev, `Item ${prev.length + 1}`]), [])
  const count = items.length

  const info = useMemo(() => `Total: ${count}`, [count])

  return (
    <div className="text-center p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-lg space-y-4">
      <Child onAdd={onAdd} />
      <p className="text-sm text-muted-foreground">{info}</p>
      <ul className="list-disc list-inside max-w-xs mx-auto text-left">
        {items.map(i => <li key={i}>{i}</li>)}
      </ul>
    </div>
  )
}

export default function UseCallbackPage() {
  const { sectionProgress, markComplete } = useSectionProgress("useCallback")
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
            <h1 className="text-4xl font-bold">useCallback Hook</h1>
            <p className="text-xl text-muted-foreground">Memoize callback functions to keep stable references for children.</p>
            <Button size="sm" onClick={handleMarkComplete} disabled={sectionProgress?.completed}>
              {sectionProgress?.completed ? "Completed" : "Mark as Complete"}
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary"/>Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
              <div>• Keep function identity stable between renders</div>
              <div>• Prevent unnecessary child renders when used with memo</div>
              <div>• Choose between useMemo and useCallback appropriately</div>
            </CardContent>
          </Card>

          <div className="space-y-8 mb-8">
            <TutorialStep
              step={1}
              title="Stable callbacks"
              content="Wrap event handlers in useCallback to avoid re-creating them on each render."
              code={`const onClick = useCallback(() => doSomething(x), [x])`}
            />
            <TutorialStep
              step={2}
              title="With memoized children"
              content="Combine memo(child) and useCallback(parent) to avoid child re-renders unless needed."
              code={`const Child = memo(({ onClick }) => ...)`}
            />
          </div>

          <InteractiveDemo
            title="Try It Yourself: Stable onAdd"
            description="Add items using a memoized callback; child is memoized."
            code={`const Child = memo(({ onAdd }) => <button onClick={onAdd}>Add</button>)\nconst onAdd = useCallback(()=>setItems([...items, 'x']), [items])`}
            component={CallbackDemo}
          />

          <div className="flex justify-between mt-10">
            <Button variant="outline" asChild>
              <Link href="/docs/hooks/use-memo"><ArrowLeft className="mr-2 h-4 w-4"/>Previous</Link>
            </Button>
            <Button asChild>
              <Link href="/docs/advanced"><ArrowRight className="ml-2 h-4 w-4"/>Advanced Patterns</Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}


