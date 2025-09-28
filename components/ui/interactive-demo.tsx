"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/ui/code-block"
import { Play, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface InteractiveDemoProps {
  title: string
  description: string
  code: string
  component: React.ComponentType
  initialProps?: Record<string, any>
}

export function InteractiveDemo({
  title,
  description,
  code,
  component: DemoComponent,
  initialProps = {},
}: InteractiveDemoProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [key, setKey] = useState(0)

  const runDemo = () => {
    setIsRunning(true)
    setTimeout(() => setIsRunning(false), 2000)
  }

  const resetDemo = () => {
    setKey((prev) => prev + 1)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={resetDemo}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={runDemo} disabled={isRunning}>
              <Play className="h-4 w-4" />
              {isRunning ? "Running..." : "Run"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="space-y-4">
            <div className="border rounded-lg p-6 bg-muted/20 min-h-[200px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <DemoComponent {...initialProps} />
                </motion.div>
              </AnimatePresence>
            </div>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock code={code} language="tsx" showLineNumbers />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
