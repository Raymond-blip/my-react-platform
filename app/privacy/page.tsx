"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, Eye, Lock, Database, Users, Globe, Mail, Calendar } from "lucide-react"
import { motion } from "framer-motion"

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: Shield,
      content: `Welcome to ReactMaster, the extraordinary React learning platform. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.`
    },
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      content: `We collect information you provide directly to us, such as when you create an account, participate in our learning programs, or contact us for support. This may include your name, email address, learning progress, and any content you create or share on our platform.`
    },
    {
      id: "usage-tracking",
      title: "How We Use Your Information",
      icon: Eye,
      content: `We use your information to provide, maintain, and improve our services, personalize your learning experience, communicate with you about updates and new features, and ensure the security of our platform.`
    },
    {
      id: "data-protection",
      title: "Data Protection & Security",
      icon: Lock,
      content: `We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is encrypted in transit and at rest.`
    },
    {
      id: "sharing",
      title: "Information Sharing",
      icon: Users,
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.`
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      icon: Globe,
      content: `We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie preferences through your browser settings.`
    },
    {
      id: "rights",
      title: "Your Rights",
      icon: Shield,
      content: `You have the right to access, update, or delete your personal information. You can also opt out of certain communications and data processing activities. Contact us to exercise these rights.`
    },
    {
      id: "updates",
      title: "Policy Updates",
      icon: Calendar,
      content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.`
    }
  ]

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
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
              <p className="text-muted-foreground">Your privacy matters to us</p>
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
        </motion.div>
      </section>

      {/* Content Sections */}
      <section className="container px-4 py-12 mx-auto max-w-4xl">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <section.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{section.title}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        Section {index + 1}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="container px-4 py-16 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-12 text-center space-y-6">
              <div className="flex items-center justify-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">Questions About Your Privacy?</h3>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're here to help. If you have any questions about this Privacy Policy or how we handle your data, 
                please don't hesitate to reach out to our privacy team.
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
                  href="/support"
                  className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  Visit Support Center
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

    </div>
  )
}
