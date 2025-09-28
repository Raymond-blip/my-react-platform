"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, RefreshCw } from "lucide-react"

interface Template {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  tags: string[]
  author: {
    name: string
    avatar: string
  }
  likes: number
  views: number
  downloads: number
  createdAt: string
  image: string
  demoUrl?: string
  code?: string
}

interface TemplatePreviewProps {
  template: Template
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  const refreshPreview = () => {
    // Refresh the iframe
    const iframe = document.getElementById("template-preview") as HTMLIFrameElement
    if (iframe) {
      iframe.src = iframe.src
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b p-4 flex items-center justify-between">
        <h3 className="font-semibold">Live Preview</h3>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={refreshPreview}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          {template.demoUrl && (
            <Button size="sm" variant="outline" asChild>
              <a href={template.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Open in New Tab
              </a>
            </Button>
          )}
        </div>
      </div>

      <div className="aspect-video bg-muted/20 relative">
        {template.demoUrl ? (
          <iframe
            id="template-preview"
            src={template.demoUrl}
            className="w-full h-full border-0"
            title={`${template.title} Preview`}
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={template.image || "/placeholder.svg"}
              alt={template.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </Card>
  )
}
