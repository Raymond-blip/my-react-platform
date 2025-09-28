"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Zap } from "lucide-react"
import { motion } from "framer-motion"

interface PromptSuggestionsProps {
  onPromptSelect: (prompt: string) => void
}

export function PromptSuggestions({ onPromptSelect }: PromptSuggestionsProps) {
  const suggestions = [
    {
      category: "UI Components",
      prompts: [
        "Create a modern button component with hover effects",
        "Build a user profile card with avatar and stats",
        "Design a pricing card with features list",
        "Make a navigation menu with dropdown",
      ],
    },
    {
      category: "Forms & Inputs",
      prompts: [
        "Create a contact form with validation",
        "Build a login form with password toggle",
        "Design a search bar with autocomplete",
        "Make a multi-step form wizard",
      ],
    },
    {
      category: "Interactive Elements",
      prompts: [
        "Create a modal dialog with backdrop",
        "Build a image carousel with navigation",
        "Design a tabs component with content",
        "Make a accordion with expand/collapse",
      ],
    },
    {
      category: "Data Display",
      prompts: [
        "Create a data table with sorting",
        "Build a dashboard with charts",
        "Design a timeline component",
        "Make a progress indicator",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <h3 className="font-semibold">Get Started with These Ideas</h3>
        </div>
        <p className="text-sm text-muted-foreground">Click any suggestion below or describe your own component idea</p>
      </div>

      <div className="space-y-4">
        {suggestions.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">{category.category}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {category.prompts.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {category.prompts.map((prompt, promptIndex) => (
                  <Button
                    key={promptIndex}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-3 hover:bg-accent/50"
                    onClick={() => onPromptSelect(prompt)}
                  >
                    <div className="flex items-start gap-2">
                      <Zap className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm leading-relaxed">{prompt}</span>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Or type your own idea in the chat below. Be as specific as possible for best results!
        </p>
      </div>
    </div>
  )
}
