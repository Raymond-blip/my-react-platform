import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import AppProviders from "@/components/app-providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "ReactMaster - Extraordinary React Learning Platform",
  description: "Learn React with AI-powered tutorials, interactive playground, and community support",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Suspense fallback={null}>
          <AppProviders>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <div className="flex-1 flex flex-col">
                {children}
              </div>
              <Footer />
            </ThemeProvider>
          </AppProviders>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
