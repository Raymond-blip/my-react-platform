"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingDots } from "@/components/ui/loading-dots"
import { Send, Bot, User, Copy, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  componentId?: string
}

interface AiChatProps {
  onPromptSubmit: (prompt: string) => void
  isGenerating: boolean
  generatedComponents: any[]
}

export function AiChat({ onPromptSubmit, isGenerating, generatedComponents }: AiChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "ai",
      content:
        "Hi! I'm your AI React assistant. Describe any component you'd like to build and I'll generate the code for you. Try something like 'Create a modern button component' or 'Build a user profile card'.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isGenerating])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isGenerating) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    onPromptSubmit(input.trim())
    setInput("")

    // Add AI response after a short delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `I'll create a ${extractComponentType(input)} for you. This will include modern styling and interactive functionality.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 500)
  }

  const extractComponentType = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase()
    if (lowerPrompt.includes("button")) return "button component"
    if (lowerPrompt.includes("card")) return "card component"
    if (lowerPrompt.includes("form")) return "form component"
    if (lowerPrompt.includes("modal")) return "modal component"
    if (lowerPrompt.includes("nav")) return "navigation component"
    return "custom component"
  }

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.type === "ai" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}

                <Card
                  className={`max-w-[80%] p-3 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 hover:bg-muted/70 transition-colors"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.type === "ai" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 shrink-0"
                        onClick={() => copyToClipboard(message.content, message.id)}
                      >
                        {copiedId === message.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {message.type === "ai" && (
                      <Badge variant="secondary" className="text-xs">
                        AI
                      </Badge>
                    )}
                  </div>
                </Card>

                {message.type === "user" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 shrink-0">
                    <User className="h-4 w-4 text-secondary" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 justify-start"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <Card className="bg-muted/50 p-3">
                <div className="flex items-center gap-2">
                  <LoadingDots size="sm" />
                  <span className="text-sm text-muted-foreground">Generating your component...</span>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input Form */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe the component you want to build..."
            disabled={isGenerating}
            className="flex-1"
          />
          <Button type="submit" disabled={!input.trim() || isGenerating} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2">
          Try: "Create a modern pricing card" or "Build a contact form with validation"
        </p>
      </div>
    </div>
  )
}
