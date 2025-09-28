"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { TemplateCard } from "@/components/template-card"
import { TemplateFilters } from "@/components/template-filters"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Sparkles, TrendingUp, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { templates } from "@/lib/templates-data"

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const categories = [
    { id: "all", label: "All Templates", count: templates.length },
    { id: "dashboard", label: "Dashboards", count: templates.filter((t) => t.category === "dashboard").length },
    { id: "ecommerce", label: "E-commerce", count: templates.filter((t) => t.category === "ecommerce").length },
    { id: "game", label: "Games", count: templates.filter((t) => t.category === "game").length },
    { id: "animation", label: "Animations", count: templates.filter((t) => t.category === "animation").length },
    { id: "ai", label: "AI Apps", count: templates.filter((t) => t.category === "ai").length },
    { id: "form", label: "Forms", count: templates.filter((t) => t.category === "form").length },
  ]

  const filteredTemplates = templates
    .filter((template) => {
      const matchesSearch =
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === "all" || template.difficulty === selectedDifficulty
      return matchesSearch && matchesCategory && matchesDifficulty
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.likes - a.likes
        case "recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "difficulty":
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8 max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Project Templates</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explore amazing React projects with live demos. Learn from real-world examples and use them as starting
            points for your own projects.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <TemplateFilters
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 h-auto p-1">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex flex-col gap-1 py-2">
                  <span className="text-sm font-medium">{category.label}</span>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-6 mb-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>{filteredTemplates.length} templates found</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Updated weekly</span>
          </div>
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <TemplateCard template={template} />
            </motion.div>
          ))}
        </motion.div>

        {filteredTemplates.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="space-y-4">
              <div className="text-6xl">🔍</div>
              <h3 className="text-xl font-semibold">No templates found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or browse different categories.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setSelectedDifficulty("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
