"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Eye, Download, Play, Code } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

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
}

interface TemplateCardProps {
  template: Template
}

export function TemplateCard({ template }: TemplateCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const difficultyColors = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="h-full overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
        <Link href={`/templates/${template.id}`}>
          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            <img
              src={template.image || "/placeholder.svg"}
              alt={template.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

            {/* Overlay buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 flex items-center justify-center gap-2"
            >
              <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                <Play className="h-4 w-4 mr-1" />
                Demo
              </Button>
              <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                <Code className="h-4 w-4 mr-1" />
                Code
              </Button>
            </motion.div>

            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-white/90 text-gray-800">
                {template.category}
              </Badge>
            </div>

            {/* Difficulty badge */}
            <div className="absolute top-3 right-3">
              <Badge className={cn("text-xs", difficultyColors[template.difficulty])}>{template.difficulty}</Badge>
            </div>
          </div>

          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {template.title}
              </CardTitle>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 shrink-0" onClick={handleLike}>
                <Heart className={cn("h-4 w-4", isLiked && "fill-red-500 text-red-500")} />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{template.description}</p>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {template.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {template.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{template.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Author and stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={template.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">
                    {template.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{template.author.name}</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {template.likes}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {template.views}
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {template.downloads}
                </div>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  )
}
