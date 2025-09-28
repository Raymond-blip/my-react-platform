"use client"

import { Navigation } from "@/components/navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function IntroPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <DocsSidebar />
        <main className="flex-1 container py-8 max-w-4xl">
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Fundamentals</Badge>
              <Badge variant="secondary">Beginner</Badge>
            </div>
            <h1 className="text-4xl font-bold">Introduction to React</h1>
            <p className="text-xl text-muted-foreground">Welcome to the React Fundamentals path! Start your journey here.</p>
            <Button asChild>
              <Link href="/docs/fundamentals/first-component">Start Lesson</Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
