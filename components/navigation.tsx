"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Code, BookOpen, Bot, Users, Sparkles, User, TestTube } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSession, signIn, signOut } from "next-auth/react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()

    const navItems = [
      { href: "/dashboard", label: "Dashboard", icon: User },
      { href: "/docs", label: "Docs", icon: BookOpen },
      { href: "/playground", label: "Playground", icon: Code },
      { href: "/ai-builder", label: "AI Builder", icon: Bot },
      { href: "/templates", label: "Templates", icon: Sparkles },
      { href: "/community", label: "Community", icon: Users },
      { href: "/test-library", label: "Library Test", icon: TestTube },
    ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
          >
            <Code className="h-4 w-4" />
          </motion.div>
          <span className="hidden font-bold text-xl sm:inline-block">ReactMaster</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex">
          <div className="mr-6 flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            {status === "loading" ? (
              <div className="h-8 w-20 animate-pulse bg-muted rounded"></div>
            ) : session ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-primary/10">
                  <img 
                    src={session.user?.image || ""} 
                    alt={session.user?.name || ""} 
                    className="h-4 w-4 rounded-full"
                  />
                  <span className="text-sm font-medium hidden sm:inline">{session.user?.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="default" size="sm" onClick={() => signIn("github")}>
                <User className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )}
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border md:hidden"
          >
            <div className="container py-4">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <div className="pt-3 border-t border-border">
                  {status === "loading" ? (
                    <div className="h-8 w-20 animate-pulse bg-muted rounded"></div>
                  ) : session ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src={session.user?.image || ""} 
                          alt={session.user?.name || ""} 
                          className="h-6 w-6 rounded-full"
                        />
                        <span className="text-sm font-medium">{session.user?.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => signOut()}>
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button variant="default" size="sm" onClick={() => signIn("github")} className="w-full">
                      <User className="h-4 w-4 mr-2" />
                      Sign In with GitHub
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
