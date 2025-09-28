"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { forumCategories } from "@/lib/forum-data"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"

export default function AskQuestionPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    console.log({ title, content, category, tags })
    router.push("/community")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/community">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Community
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Ask a Question</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Share your question with the community</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                      <Label htmlFor="title">Question Title</Label>
                      <Input
                        id="title"
                        placeholder="What's your React question?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {forumCategories
                            .filter((cat) => cat.id !== "all")
                            .map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Content */}
                    <div>
                      <Label htmlFor="content">Question Details</Label>
                      <Textarea
                        id="content"
                        placeholder="Describe your question in detail. Include any code, error messages, or context that might help others understand your problem."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={8}
                        className="mt-2"
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <Label htmlFor="tags">Tags (up to 5)</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="tags"
                          placeholder="Add a tag..."
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                          className="flex-1"
                        />
                        <Button type="button" onClick={addTag} variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 hover:text-destructive"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button type="submit" className="w-full">
                      Post Question
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Tips */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Writing Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">📝 Be Specific</h4>
                    <p className="text-muted-foreground">
                      Include relevant code, error messages, and what you've already tried.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">🔍 Search First</h4>
                    <p className="text-muted-foreground">Check if your question has been asked before.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">🏷️ Use Tags</h4>
                    <p className="text-muted-foreground">
                      Add relevant tags to help others find and answer your question.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["hooks", "components", "state", "props", "jsx", "typescript", "nextjs", "routing"].map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => {
                          if (!tags.includes(tag) && tags.length < 5) {
                            setTags([...tags, tag])
                          }
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
