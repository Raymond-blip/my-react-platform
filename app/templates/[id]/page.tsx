"use client"

import { useState } from "react"
import * as React from "react"
import { Navigation } from "@/components/navigation"
import { TemplatePreview } from "@/components/template-preview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/ui/code-block"
import { Heart, Download, Share, ArrowLeft, ExternalLink, Github } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { templates } from "@/lib/templates-data"
import { cn } from "@/lib/utils"

export default function TemplateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // ✅ unwrap params with React.use
  const { id } = React.use(params)

  const template = templates.find((t) => t.id === id)
  const [isLiked, setIsLiked] = useState(false)

  if (!template) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Template not found</h1>
          <Button asChild>
            <Link href="/templates">Back to Templates</Link>
          </Button>
        </div>
      </div>
    )
  }

  const difficultyColors = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8 max-w-7xl">
        {/* Back button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/templates">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Templates
            </Link>
          </Button>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{template.category}</Badge>
                    <Badge className={cn("text-xs", difficultyColors[template.difficulty])}>
                      {template.difficulty}
                    </Badge>
                  </div>
                  <h1 className="text-3xl font-bold">{template.title}</h1>
                  <p className="text-lg text-muted-foreground">{template.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => setIsLiked(!isLiked)}>
                    <Heart className={cn("h-4 w-4 mr-1", isLiked && "fill-red-500 text-red-500")} />
                    {template.likes + (isLiked ? 1 : 0)}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Preview and Code */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">Live Preview</TabsTrigger>
                  <TabsTrigger value="code">Source Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-6">
                  <TemplatePreview template={template} />
                </TabsContent>
                <TabsContent value="code" className="mt-6">
                  <CodeBlock
                    code={template.code || "// Code will be available soon"}
                    language="tsx"
                    showLineNumbers
                    title={`${template.title}.tsx`}
                  />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Created by</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={template.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {template.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{template.author.name}</p>
                      <p className="text-sm text-muted-foreground">React Developer</p>
                    </div>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    Follow
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{template.likes}</div>
                      <div className="text-sm text-muted-foreground">Likes</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{template.views}</div>
                      <div className="text-sm text-muted-foreground">Views</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{template.downloads}</div>
                      <div className="text-sm text-muted-foreground">Downloads</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4.8</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Actions */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Get Started</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in Playground
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Related Templates */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {templates
                    .filter((t) => t.id !== template.id && t.category === template.category)
                    .slice(0, 3)
                    .map((relatedTemplate) => (
                      <Link
                        key={relatedTemplate.id}
                        href={`/templates/${relatedTemplate.id}`}
                        className="block p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex gap-3">
                          <img
                            src={relatedTemplate.image || "/placeholder.svg"}
                            alt={relatedTemplate.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm line-clamp-1">{relatedTemplate.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {relatedTemplate.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
