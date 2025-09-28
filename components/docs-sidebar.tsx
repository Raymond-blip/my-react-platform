"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Search, ChevronDown, ChevronRight, BookOpen, Zap, Target, TestTube } from "lucide-react"
import { cn } from "@/lib/utils"

export function DocsSidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [openSections, setOpenSections] = useState<string[]>(["fundamentals"])

  const toggleSection = (section: string) => {
    setOpenSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const docsSections = [
    {
      id: "fundamentals",
      title: "React Fundamentals",
      icon: BookOpen,
      badge: "Beginner",
      items: [
        { title: "Introduction", href: "/docs/fundamentals/intro" },
        { title: "Your First Component", href: "/docs/fundamentals/first-component" },
        { title: "Understanding JSX", href: "/docs/fundamentals/jsx" },
        { title: "Props and State", href: "/docs/fundamentals/props-state" },
        { title: "Event Handling", href: "/docs/fundamentals/events" },
        { title: "Conditional Rendering", href: "/docs/fundamentals/conditional" },
        { title: "Lists and Keys", href: "/docs/fundamentals/lists" },
        { title: "Forms", href: "/docs/fundamentals/forms" },
      ],
    },
    {
      id: "hooks",
      title: "Hooks Deep Dive",
      icon: Zap,
      badge: "Intermediate",
      items: [
        { title: "Introduction to Hooks", href: "/docs/hooks/intro" },
        { title: "useState Hook", href: "/docs/hooks/usestate" },
        { title: "useEffect Hook", href: "/docs/hooks/useeffect" },
        { title: "useContext Hook", href: "/docs/hooks/usecontext" },
        { title: "useReducer Hook", href: "/docs/hooks/usereducer" },
        { title: "Custom Hooks", href: "/docs/hooks/custom" },
        { title: "Hook Rules", href: "/docs/hooks/rules" },
      ],
    },
    {
      id: "advanced",
      title: "Advanced Patterns",
      icon: Target,
      badge: "Advanced",
      items: [
        { title: "Render Props", href: "/docs/advanced/render-props" },
        { title: "Higher-Order Components", href: "/docs/advanced/hoc" },
        { title: "Compound Components", href: "/docs/advanced/compound" },
        { title: "Performance Optimization", href: "/docs/advanced/performance" },
        { title: "Error Boundaries", href: "/docs/advanced/error-boundaries" },
        { title: "Portals", href: "/docs/advanced/portals" },
        { title: "Refs and DOM", href: "/docs/advanced/refs" },
      ],
    },
    {
      id: "testing",
      title: "Testing React Apps",
      icon: TestTube,
      badge: "Intermediate",
      items: [
        { title: "Testing Overview", href: "/docs/testing/overview" },
        { title: "Unit Testing", href: "/docs/testing/unit" },
        { title: "Integration Testing", href: "/docs/testing/integration" },
        { title: "End-to-End Testing", href: "/docs/testing/e2e" },
        { title: "Testing Hooks", href: "/docs/testing/hooks" },
        { title: "Mocking", href: "/docs/testing/mocking" },
      ],
    },
  ]

  const filteredSections = docsSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase())),
    }))
    .filter((section) => section.items.length > 0)

  return (
    <aside className="w-80 border-r bg-muted/20 h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Navigation */}
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="space-y-2">
            {filteredSections.map((section) => (
              <Collapsible
                key={section.id}
                open={openSections.includes(section.id)}
                onOpenChange={() => toggleSection(section.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-2 h-auto font-medium">
                    <div className="flex items-center gap-2">
                      <section.icon className="h-4 w-4" />
                      <span>{section.title}</span>
                      <Badge variant="secondary" className="text-xs">
                        {section.badge}
                      </Badge>
                    </div>
                    {openSections.includes(section.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 ml-6 mt-2">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href && "bg-accent text-accent-foreground font-medium",
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </div>
    </aside>
  )
}
