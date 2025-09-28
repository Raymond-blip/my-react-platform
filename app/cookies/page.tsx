"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Cookie, Settings, Shield, Eye, Database, Globe, Clock, Mail, Calendar, CheckCircle, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function CookiePolicyPage() {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false
  })

  const cookieTypes = [
    {
      id: "essential",
      name: "Essential Cookies",
      icon: Shield,
      description: "These cookies are necessary for the website to function and cannot be switched off in our systems.",
      examples: ["Authentication", "Security", "Load balancing", "User preferences"],
      required: true,
      color: "bg-green-50 border-green-200 text-green-800 dark:bg-green-950/20 dark:border-green-800 dark:text-green-300"
    },
    {
      id: "analytics",
      name: "Analytics Cookies",
      icon: Database,
      description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.",
      examples: ["Google Analytics", "Performance monitoring", "Usage statistics", "Error tracking"],
      required: false,
      color: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/20 dark:border-blue-800 dark:text-blue-300"
    },
    {
      id: "marketing",
      name: "Marketing Cookies",
      icon: Globe,
      description: "These cookies may be set through our site by our advertising partners to build a profile of your interests.",
      examples: ["Ad targeting", "Social media integration", "Remarketing", "Campaign tracking"],
      required: false,
      color: "bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-950/20 dark:border-purple-800 dark:text-purple-300"
    },
    {
      id: "preferences",
      name: "Preference Cookies",
      icon: Settings,
      description: "These cookies enable the website to provide enhanced functionality and personalization.",
      examples: ["Theme preferences", "Language settings", "Customization", "User interface preferences"],
      required: false,
      color: "bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950/20 dark:border-orange-800 dark:text-orange-300"
    }
  ]

  const cookieDetails = [
    {
      name: "session_id",
      type: "Essential",
      purpose: "Maintains your session while browsing",
      duration: "Session",
      provider: "ReactMaster"
    },
    {
      name: "_ga",
      type: "Analytics",
      purpose: "Distinguishes unique users",
      duration: "2 years",
      provider: "Google Analytics"
    },
    {
      name: "_gid",
      type: "Analytics",
      purpose: "Distinguishes unique users",
      duration: "24 hours",
      provider: "Google Analytics"
    },
    {
      name: "theme_preference",
      type: "Preference",
      purpose: "Stores your theme choice",
      duration: "1 year",
      provider: "ReactMaster"
    },
    {
      name: "marketing_consent",
      type: "Marketing",
      purpose: "Tracks marketing consent status",
      duration: "1 year",
      provider: "ReactMaster"
    }
  ]

  const handleCookieToggle = (cookieType: string) => {
    if (cookieType === "essential") return // Essential cookies cannot be disabled
    
    setCookiePreferences(prev => ({
      ...prev,
      [cookieType]: !prev[cookieType]
    }))
  }

  const savePreferences = () => {
    // In a real app, this would save to localStorage and update cookie settings
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences))
    alert('Cookie preferences saved successfully!')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container px-4 py-24 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Cookie className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Cookie Policy</h1>
              <p className="text-muted-foreground">How we use cookies to enhance your experience</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Last Updated: September 13, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Questions? Contact us at privacy@reactmaster.com</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6 mt-8">
            <p className="text-muted-foreground">
              <strong>Cookie Notice:</strong> We use cookies to improve your experience on our platform, 
              analyze site usage, and assist in our marketing efforts. You can manage your cookie preferences below.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Cookie Types Section */}
      <section className="container px-4 py-12 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Types of Cookies We Use</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We use different types of cookies to provide you with the best possible experience on our platform.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={cookie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <cookie.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{cookie.name}</CardTitle>
                          {cookie.required && (
                            <Badge variant="outline" className="text-xs mt-1">
                              Required
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant={cookiePreferences[cookie.id as keyof typeof cookiePreferences] ? "default" : "outline"}
                          onClick={() => handleCookieToggle(cookie.id)}
                          disabled={cookie.required}
                          className="h-8"
                        >
                          {cookiePreferences[cookie.id as keyof typeof cookiePreferences] ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <AlertTriangle className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {cookie.description}
                    </p>
                    
                    <div className={`p-3 rounded-lg border ${cookie.color}`}>
                      <h4 className="font-semibold text-sm mb-2">Examples:</h4>
                      <div className="flex flex-wrap gap-1">
                        {cookie.examples.map((example, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Cookie Details Table */}
      <section className="container px-4 py-12 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Cookie Details</h2>
            <p className="text-muted-foreground">
              Detailed information about the specific cookies we use on our platform.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cookie Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Cookie Name</th>
                      <th className="text-left p-3 font-semibold">Type</th>
                      <th className="text-left p-3 font-semibold">Purpose</th>
                      <th className="text-left p-3 font-semibold">Duration</th>
                      <th className="text-left p-3 font-semibold">Provider</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookieDetails.map((cookie, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-mono text-sm">{cookie.name}</td>
                        <td className="p-3">
                          <Badge variant="outline" className="text-xs">
                            {cookie.type}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{cookie.purpose}</td>
                        <td className="p-3 text-sm">{cookie.duration}</td>
                        <td className="p-3 text-sm">{cookie.provider}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Cookie Management Section */}
      <section className="container px-4 py-12 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-12 text-center space-y-6">
              <div className="flex items-center justify-center gap-3">
                <Settings className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">Manage Your Cookie Preferences</h3>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                You can control which cookies you accept. Essential cookies are required for the site to function, 
                but you can opt out of analytics, marketing, and preference cookies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={savePreferences}
                  className="px-8 py-3"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setCookiePreferences({
                      essential: true,
                      analytics: true,
                      marketing: true,
                      preferences: true
                    })
                  }}
                  className="px-8 py-3"
                >
                  Accept All Cookies
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="container px-4 py-16 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-12 text-center space-y-6">
              <div className="flex items-center justify-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">Questions About Cookies?</h3>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                If you have any questions about our use of cookies or need help managing your preferences, 
                our privacy team is here to assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:privacy@reactmaster.com"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Privacy Team
                </a>
                <a 
                  href="/privacy"
                  className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  Read Privacy Policy
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

    </div>
  )
}
