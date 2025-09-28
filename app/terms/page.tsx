"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Scale, Users, AlertTriangle, CheckCircle, XCircle, Mail, Calendar, Shield } from "lucide-react"
import { motion } from "framer-motion"

export default function TermsOfServicePage() {
  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: `By accessing and using ReactMaster, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`,
      type: "important"
    },
    {
      id: "description",
      title: "Service Description",
      icon: FileText,
      content: `ReactMaster is an AI-powered React learning platform that provides interactive tutorials, live coding playgrounds, AI component generation, community forums, and educational resources for learning React development.`,
      type: "info"
    },
    {
      id: "user-accounts",
      title: "User Accounts",
      icon: Users,
      content: `You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.`,
      type: "warning"
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use Policy",
      icon: Shield,
      content: `Users agree not to use the service for any unlawful purpose or any purpose prohibited under this clause. You may not use the service in any manner that could damage, disable, overburden, or impair any server.`,
      type: "important"
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      icon: Scale,
      content: `The service and its original content, features, and functionality are and will remain the exclusive property of ReactMaster and its licensors. The service is protected by copyright, trademark, and other laws.`,
      type: "info"
    },
    {
      id: "user-content",
      title: "User-Generated Content",
      icon: FileText,
      content: `You retain ownership of any content you create, upload, or share on our platform. By posting content, you grant us a license to use, display, and distribute your content in connection with the service.`,
      type: "info"
    },
    {
      id: "prohibited-activities",
      title: "Prohibited Activities",
      icon: XCircle,
      content: `You may not use our service to: violate any laws or regulations, infringe on intellectual property rights, distribute malware or harmful code, spam or harass other users, or attempt to gain unauthorized access to our systems.`,
      type: "warning"
    },
    {
      id: "termination",
      title: "Termination",
      icon: AlertTriangle,
      content: `We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.`,
      type: "important"
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      icon: AlertTriangle,
      content: `The information on this service is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms.`,
      type: "warning"
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      icon: Scale,
      content: `In no event shall ReactMaster, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.`,
      type: "important"
    },
    {
      id: "governing-law",
      title: "Governing Law",
      icon: Scale,
      content: `These Terms shall be interpreted and governed by the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision will not be considered a waiver.`,
      type: "info"
    },
    {
      id: "changes",
      title: "Changes to Terms",
      icon: Calendar,
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.`,
      type: "info"
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "important":
        return "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/20 dark:border-red-800 dark:text-red-300"
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950/20 dark:border-yellow-800 dark:text-yellow-300"
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/20 dark:border-blue-800 dark:text-blue-300"
      default:
        return "bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-950/20 dark:border-gray-800 dark:text-gray-300"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "important":
        return AlertTriangle
      case "warning":
        return AlertTriangle
      case "info":
        return CheckCircle
      default:
        return FileText
    }
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
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
              <p className="text-muted-foreground">Please read these terms carefully</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Last Updated: September 13, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Questions? Contact us at legal@reactmaster.com</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6 mt-8">
            <p className="text-muted-foreground">
              <strong>Important:</strong> By using ReactMaster, you agree to be bound by these Terms of Service. 
              Please read them carefully before using our platform.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Content Sections */}
      <section className="container px-4 py-12 mx-auto max-w-4xl">
        <div className="space-y-8">
          {sections.map((section, index) => {
            const TypeIcon = getTypeIcon(section.type)
            return (
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
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">
                            Section {index + 1}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`${getTypeColor(section.type)} border`}
                          >
                            <TypeIcon className="h-3 w-3 mr-1" />
                            {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                          </Badge>
                        </div>
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
            )
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section className="container px-4 py-16 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-12 text-center space-y-6">
              <div className="flex items-center justify-center gap-3">
                <Scale className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">Need Legal Assistance?</h3>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                If you have questions about these Terms of Service or need legal clarification, 
                our legal team is here to help you understand your rights and obligations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:legal@reactmaster.com"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Legal Team
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
