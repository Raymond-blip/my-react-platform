"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/ui/code-block"
import { LivePreview } from "@/components/live-preview"
import { Copy, Check, Download, Share, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

interface GeneratedComponent {
  id: string
  prompt: string
  code: string
  timestamp: Date
  title: string
}

interface AiCodePreviewProps {
  component: GeneratedComponent
}

export function AiCodePreview({ component }: AiCodePreviewProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(component.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadComponent = () => {
    const blob = new Blob([component.code], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${component.title.replace(/\s+/g, "")}.jsx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareComponent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: component.title,
          text: `Check out this AI-generated React component: ${component.title}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback to copying URL
      await navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{component.title}</h3>
            <Badge variant="secondary" className="text-xs">
              Generated
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button size="sm" variant="ghost" onClick={downloadComponent}>
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button size="sm" variant="ghost" onClick={shareComponent}>
              <Share className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Generated from: "{component.prompt}"</p>
        <p className="text-xs text-muted-foreground">{component.timestamp.toLocaleString()}</p>
      </div>

      {/* Content */}
      <div className="flex-1">
        <Tabs defaultValue="preview" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
            <TabsTrigger value="preview">Live Preview</TabsTrigger>
            <TabsTrigger value="code">Source Code</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="flex-1 m-4 mt-2">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Live Preview</CardTitle>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-[calc(100%-5rem)]">
                <div className="h-full border rounded-lg overflow-hidden">
                  <LivePreview code={component.code} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="flex-1 m-4 mt-2">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Source Code</CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-5rem)] overflow-hidden">
                <div className="h-full">
                  <CodeBlock code={component.code} language="tsx" showLineNumbers title={`${component.title}.jsx`} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  )
}
