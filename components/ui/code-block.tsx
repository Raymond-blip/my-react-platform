"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  showLineNumbers?: boolean
  runnable?: boolean
  onRun?: () => void
  className?: string
}

export function CodeBlock({
  code,
  language = "javascript",
  title,
  showLineNumbers = false,
  runnable = false,
  onRun,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      {title && (
        <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{title}</span>
            <Badge variant="outline" className="text-xs">
              {language}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {runnable && (
              <Button size="sm" variant="ghost" onClick={onRun}>
                <Play className="h-3 w-3" />
                Run
              </Button>
            )}
            <Button size="sm" variant="ghost" onClick={copyToClipboard}>
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm">
          <code className={`language-${language}`}>
            {showLineNumbers
              ? code.split("\n").map((line, i) => (
                  <div key={i} className="flex">
                    <span className="mr-4 select-none text-muted-foreground w-8 text-right">{i + 1}</span>
                    <span>{line}</span>
                  </div>
                ))
              : code}
          </code>
        </pre>
      </div>
    </Card>
  )
}
