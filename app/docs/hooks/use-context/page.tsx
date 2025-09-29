"use client"

import { Navigation } from "@/components/navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveDemo } from "@/components/ui/interactive-demo"
import { TutorialStep } from "@/components/tutorial-step"
import { useSectionProgress } from "@/lib/hooks/useProgress"
import { createContext, useContext, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react"

const ThemeContext = createContext<{ theme: string; setTheme: (t: string) => void } | null>(null)

function ProviderDemo() {
  const [theme, setTheme] = useState("light")
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  )
}

function Toolbar() {
  return (
    <div className="text-center p-6 bg-gradient-to-r from-cyan-50 to-emerald-50 dark:from-cyan-950/20 dark:to-emerald-950/20 rounded-lg space-y-4">
      <ThemeToggleButton />
      <ThemeLabel />
    </div>
  )
}

function ThemeToggleButton() {
  const ctx = useContext(ThemeContext)!
  return (
    <Button onClick={() => ctx.setTheme(ctx.theme === "light" ? "dark" : "light")}>
      Toggle Theme
    </Button>
  )
}

function ThemeLabel() {
  const ctx = useContext(ThemeContext)!
  return <p className="text-sm text-muted-foreground">Current theme: {ctx.theme}</p>
}

export default function UseContextPage() {
  const { sectionProgress, markComplete } = useSectionProgress("useContext")
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
            <h1 className="text-4xl font-bold">useContext Hook</h1>
            <p className="text-xl text-muted-foreground">Share data without prop drilling using React Context.</p>
            <Button size="sm" onClick={handleMarkComplete} disabled={sectionProgress?.completed}>
              {sectionProgress?.completed ? "Completed" : "Mark as Complete"}
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary"/>Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
              <div>• Create a Context and provide values</div>
              <div>• Read context via useContext in descendants</div>
              <div>• Choose between context and props appropriately</div>
            </CardContent>
          </Card>

          <div className="space-y-8 mb-8">
            <TutorialStep
              step={1}
              title="Creating Context"
              content="Export a Context and wrap part of your tree with a Provider supplying the value."
              code={`const MyContext = createContext(null)\n\n<MyContext.Provider value={...}>\n  <App />\n</MyContext.Provider>`}
            />
            <TutorialStep
              step={2}
              title="Consuming Context"
              content="Call useContext(MyContext) in any descendant to read the nearest provided value."
              code={`const value = useContext(MyContext)`}
            />
          </div>

          <InteractiveDemo
            title="Try It Yourself: Theme Context"
            description="Toggle a theme value stored in context and read it in multiple places."
            code={`const ThemeContext = createContext(null)\n\nfunction Provider(){\n  const [theme, setTheme] = useState('light')\n  return <ThemeContext.Provider value={{theme, setTheme}}><Toolbar/></ThemeContext.Provider>\n}`}
            component={ProviderDemo}
          />

          <div className="flex justify-between mt-10">
            <Button variant="outline" asChild>
              <Link href="/docs/hooks/use-effect"><ArrowLeft className="mr-2 h-4 w-4"/>Previous</Link>
            </Button>
            <Button asChild>
              <Link href="/docs/hooks/use-reducer">Next: useReducer<ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}


