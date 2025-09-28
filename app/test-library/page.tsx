"use client"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"

export default function TestLibraryPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🧪 Library Test Page</h1>
          <p className="text-xl text-muted-foreground">
            Testing your React component library components
          </p>
        </div>

        {/* Button Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Button Components</CardTitle>
            <CardDescription>Testing different button variants</CardDescription>
          </CardHeader>
          <CardContent className="space-x-4">
            <Button>Default Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </CardContent>
        </Card>

        {/* Badge Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Badge Components</CardTitle>
            <CardDescription>Testing different badge variants</CardDescription>
          </CardHeader>
          <CardContent className="space-x-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="outline">Outline</Badge>
          </CardContent>
        </Card>

        {/* Form Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Form Components</CardTitle>
            <CardDescription>Testing input and label components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="test-input">Test Input</Label>
              <Input id="test-input" placeholder="Type something..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="test-input-2">Another Input</Label>
              <Input id="test-input-2" placeholder="Another input field..." />
            </div>
          </CardContent>
        </Card>

        {/* Interactive Test */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Test</CardTitle>
            <CardDescription>Click the button to test functionality</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => alert('🎉 Library components are working!')}
              className="w-full"
            >
              Test Library Components
            </Button>
          </CardContent>
        </Card>

        {/* Status */}
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200">
              ✅ Library Status: Working!
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              All components are successfully imported and rendered from your library
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-green-700 dark:text-green-300">
                • Build system: ✅ Working
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                • Component imports: ✅ Working
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                • TypeScript: ✅ Working
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                • Styling: ✅ Working
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
