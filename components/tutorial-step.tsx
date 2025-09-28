"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/ui/code-block"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface TutorialStepProps {
  step: number
  title: string
  content: string
  code?: string
  language?: string
  tip?: string
}

export function TutorialStep({ step, title, content, code, language = "tsx", tip }: TutorialStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: step * 0.1 }}
    >
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
              {step}
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">{content}</p>

          {code && <CodeBlock code={code} language={language} showLineNumbers runnable={false} />}

          {tip && (
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-2">
                <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                  Tip
                </Badge>
                <p className="text-sm text-blue-700 dark:text-blue-300">{tip}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
