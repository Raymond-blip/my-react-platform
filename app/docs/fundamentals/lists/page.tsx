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
function ListDemoComponent() {
  const [items, setItems] = useState([
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Cherry" },
  ])
  const [newItem, setNewItem] = useState("")

  const addItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, { id: items.length + 1, name: newItem.trim() }])
      setNewItem("")
    }
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <div className="text-center p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg space-y-4">
      <h2 className="text-xl font-bold mb-2">My Shopping List</h2>
      <div className="flex justify-center gap-2 mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
          className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        />
        <Button onClick={addItem}>Add</Button>
      </div>
      <ul className="list-disc list-inside space-y-2 max-w-xs mx-auto text-left">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center">
            {item.name}
            <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ListsPage() {
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
            <h1 className="text-4xl font-bold">Lists and Keys</h1>
            <p className="text-xl text-muted-foreground">Render collections efficiently with stable keys and correct patterns.</p>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/docs/fundamentals/forms">Next: Forms</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/docs/fundamentals/conditional">Previous: Conditional Rendering</Link>
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
                  <div>• Render lists with Array.map</div>
                  <div>• Choose good keys (stable, unique, not array index)</div>
                  <div>• Split items into item components for clarity</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rendering Lists</CardTitle>
                </CardHeader>
                <CardContent>
                  <TutorialStep
                    step={1}
                    title="Basic mapping"
                    content="Use map to render an element per item."
                    code={`function List({ items }){\n  return (\n    <ul>\n      {items.map(item => <li key={item.id}>{item.label}</li>)}\n    </ul>\n  )\n}`}
                  />
                  <TutorialStep
                    step={2}
                    title="Avoid index as key"
                    content="Using array index breaks identity during reordering. Prefer stable ids."
                    code={`// Bad: key={index}\n// Good: key={item.id}`}
                  />
                  <TutorialStep
                    step={3}
                    title="Extract item component"
                    content="Move item rendering to a separate component for readability."
                    code={`function TodoItem({ todo }){\n  return <li>{todo.text}</li>\n}\nfunction TodoList({ todos }){\n  return <ul>{todos.map(t => <TodoItem key={t.id} todo={t} />)}</ul>\n}`}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Try it yourself</CardTitle>
                </CardHeader>
                <CardContent>
                  <InteractiveDemo
                    title="Dynamic List"
                    description="Add and remove items; ensure keys are stable."
                    code={`function DynamicList(){\n  const [items, setItems] = React.useState([\n    { id: 1, label: 'Learn JSX' },\n    { id: 2, label: 'Understand Props' }\n  ])\n  function add(){\n    const id = Math.max(0, ...items.map(i=>i.id)) + 1\n    setItems([...items, { id, label: 'New Item ' + id }])\n  }\n  function remove(id){\n    setItems(items.filter(i => i.id !== id))\n  }\n  return (\n    <div>\n      <button onClick={add}>Add</button>\n      <ul>\n        {items.map(item => (\n          <li key={item.id}>\n            {item.label} <button onClick={() => remove(item.id)}>x</button>\n          </li>\n        ))}\n      </ul>\n    </div>\n  )\n}\n\nfunction App(){\n  return <DynamicList />\n}`}
                    component={ListDemoComponent}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exercises</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <div>1) Build a paginated list component with next/prev controls.</div>
                  <div>2) Reorder items (drag or buttons) and ensure UI stays correct.</div>
                  <div>3) Add a filter input to show only matching items.</div>
                </CardContent>
              </Card>
            </div>

            <div className="hidden lg:block">
              <ProgressTracker currentLesson={7} totalLessons={8} completedLessons={[]} currentPath={"lists"} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
