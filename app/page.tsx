"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Bot, Users, Sparkles, Play, BookOpen, Zap, Trophy } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
export default function HomePage() {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Docs",
      description: "Learn React with hands-on tutorials and real-time examples",
      href: "/docs",
    },
    {
      icon: Code,
      title: "Live Playground",
      description: "Test React code instantly with our in-browser editor",
      href: "/playground",
    },
    {
      icon: Bot,
      title: "AI React Builder",
      description: "Describe your idea and watch AI generate React components",
      href: "/ai-builder",
    },
    {
      icon: Sparkles,
      title: "Project Templates",
      description: "Explore amazing React projects with live demos",
      href: "/templates",
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with developers and get help from experts",
      href: "/community",
    },
    {
      icon: Zap,
      title: "AI-Powered Tools",
      description: "Quiz generator, bug fixer, and code reviewer",
      href: "/tools",
    },
  ]

  const progress = 65 // percent

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section with Video */}
      <section className="container px-4 py-24 mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm font-medium animate-pulse">
              The Future of React Learning
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance">
              Master React with
              <span className="text-primary animate-gradient"> AI-Powered</span> Learning
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
              Experience the most advanced React learning platform. Interactive tutorials, AI assistance, live coding
              playground, and a thriving community - all in one place.
            </p>
            <div className="flex justify-center mt-8">
              <div className="w-full max-w-2xl aspect-video rounded-xl shadow-lg border-4 border-primary/20 overflow-hidden mx-auto">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/Tn6-PIqc4UM"
                  title="React JS Crash Course - 2023"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/playground">
                <Play className="mr-2 h-5 w-5" />
                Start Learning
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/docs">
                Explore Docs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container px-4 py-24 mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything You Need to Master React</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From beginner tutorials to advanced AI-powered tools, we've got you covered.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer" asChild>
                <Link href={feature.href}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Progress Tracker */}
      <section className="container px-4 py-8 mx-auto max-w-screen-xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="mb-8 shadow-lg">
            <CardContent className="flex flex-col items-center py-8">
              <h2 className="text-2xl font-bold mb-2">Your Learning Progress</h2>
              <div className="w-full max-w-md">
                <div className="h-6 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1 }}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-right text-sm mt-2 text-primary font-semibold">{progress}% Complete</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-24 mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-12 text-center space-y-6">
              <h3 className="text-3xl font-bold tracking-tight">Ready to Build Something Amazing?</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of developers who are already mastering React with our platform. Start your journey today
                and build the future of web development.
              </p>
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/ai-builder">
                  <Bot className="mr-2 h-5 w-5" />
                  Try AI Builder
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}
