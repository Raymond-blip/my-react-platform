"use client"

import React, { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Code,
  BookOpen,
  Bot,
  Users,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
  Heart,
  Atom,
  ArrowRight,
  Mail,
} from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [logoSpins, setLogoSpins] = useState(0)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const handleLogoClick = () => {
    setLogoSpins((prev) => prev + 1)
  }

  const quickLinks = [
    { href: "/docs", label: "Docs", icon: BookOpen },
    { href: "/playground", label: "Playground", icon: Code },
    { href: "/ai-builder", label: "AI Builder", icon: Bot },
    { href: "/templates", label: "Templates", icon: Sparkles },
    { href: "/community", label: "Community", icon: Users },
  ]

  const resources = [
    { href: "/blog", label: "Blog" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/github", label: "GitHub" },
    { href: "/faq", label: "FAQs" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ]

  const socialLinks = [
    { href: "https://twitter.com/reactedu", icon: Twitter, label: "Twitter" },
    { href: "https://github.com/reactedu", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/company/reactedu", icon: Linkedin, label: "LinkedIn" },
    { href: "https://youtube.com/@reactedu", icon: Youtube, label: "YouTube" },
    { href: "https://discord.gg/reactedu", icon: MessageCircle, label: "Discord" },
  ]

  // Render deterministic positions on server, randomize on client after hydration
  const [particles, setParticles] = useState(() =>
    Array.from({ length: 20 }, () => ({
      initial: { x: 0, y: 0 },
      animate: { x: 0, y: 0 },
      duration: 20,
    }))
  )

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        initial: {
          x: Math.random() * 1200,
          y: Math.random() * 400,
        },
        animate: {
          x: Math.random() * 1200,
          y: Math.random() * 400,
        },
        duration: Math.random() * 20 + 10,
      }))
    )
  }, [])

  return (
    <footer className="relative bg-gradient-to-br from-background via-background to-primary/5 border-t border-border/40 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            initial={particle.initial}
            animate={particle.animate}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Glowing orb effect */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-secondary/10 rounded-full blur-2xl opacity-30" />

      <div className="relative container px-4 py-16 mx-auto max-w-screen-xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: logoSpins * 360 }}
                transition={{ duration: 0.5 }}
                onClick={handleLogoClick}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground cursor-pointer"
              >
                <Atom className="h-5 w-5" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold">ReactEdu</h3>
                <p className="text-sm text-muted-foreground">Learn, Build, Innovate</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The most advanced React learning platform with AI-powered tutorials, interactive playground, and thriving
              community.
            </p>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500 animate-pulse" />
              <span>and</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Atom className="h-3 w-3 text-blue-500" />
              </motion.div>
              <span>by the ReactEdu Team</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold">Stay Connected</h4>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Get the latest React tips and updates</p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-12 bg-background/50 backdrop-blur-sm"
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" size="sm" className="w-full" disabled={isSubscribed}>
                    {isSubscribed ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center space-x-1"
                      >
                        <span>Subscribed!</span>
                        <Heart className="h-3 w-3" />
                      </motion.span>
                    ) : (
                      <span className="flex items-center space-x-1">
                        <span>Subscribe</span>
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Follow Us</p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-sm text-muted-foreground">© 2025 ReactEdu. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/cookies" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
