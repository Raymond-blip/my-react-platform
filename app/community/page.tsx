"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ForumPost } from "@/components/forum-post"
import { forumPosts, forumCategories } from "@/lib/forum-data"
import { Search, Plus, TrendingUp, Clock, MessageSquare } from "lucide-react"

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredPosts = forumPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const trendingPosts = forumPosts.filter((post) => post.votes > 50).slice(0, 5)
  const recentPosts = [...forumPosts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            React Community
          </h1>
          <p className="text-xl text-muted-foreground mb-8">Ask questions, share knowledge, and learn together</p>

          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Link href="/community/ask">
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Ask Question
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <h3 className="font-semibold">Categories</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {forumCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Trending Posts */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Trending
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingPosts.map((post) => (
                  <Link key={post.id} href={`/community/${post.id}`}>
                    <div className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                      <p className="text-sm font-medium line-clamp-2 mb-1">{post.title}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>{post.votes} votes</span>
                        <span className="mx-2">•</span>
                        <span>{post.replies} replies</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-3">
            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recent" className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Recent
                </TabsTrigger>
                <TabsTrigger value="popular" className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Popular
                </TabsTrigger>
                <TabsTrigger value="unanswered" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Unanswered
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="space-y-4 mt-6">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ForumPost post={post} />
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="popular" className="space-y-4 mt-6">
                {[...filteredPosts]
                  .sort((a, b) => b.votes - a.votes)
                  .map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ForumPost post={post} />
                    </motion.div>
                  ))}
              </TabsContent>

              <TabsContent value="unanswered" className="space-y-4 mt-6">
                {filteredPosts
                  .filter((post) => post.replies === 0)
                  .map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ForumPost post={post} />
                    </motion.div>
                  ))}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
