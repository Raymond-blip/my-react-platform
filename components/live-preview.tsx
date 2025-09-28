"use client"

import { useEffect, useState, useRef } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LivePreviewProps {
  code: string
  onConsoleOutput?: (output: string[]) => void
}

export function LivePreview({ code, onConsoleOutput }: LivePreviewProps) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Helper to append window.Component assignment for the last declared function
  function appendComponentExport(code: string) {
    // Try to find export default (function or otherwise)
    const defaultExportRegex = /export\s+default\s+(\w+)/
    const functionRegex = /function\s+(\w+)\s*\(/g
    let match
    let lastFunctionName = null
    let defaultExportName = null
    // Check for export default
    const defaultMatch = defaultExportRegex.exec(code)
    if (defaultMatch) {
      defaultExportName = defaultMatch[1]
    }
    // Find last function declaration
    while ((match = functionRegex.exec(code)) !== null) {
      lastFunctionName = match[1]
    }
    // If export default is a function declaration
    if (defaultExportName) {
      return code + `\nwindow.Component = ${defaultExportName};`
    }
    // If export default is an anonymous function/component
    const anonDefaultExport = code.match(/export\s+default\s+function\s*\(/)
    if (anonDefaultExport) {
      return code + `\nwindow.Component = default;`
    }
    // Try to render the first function if nothing else
    if (lastFunctionName) {
      return code + `\nwindow.Component = ${lastFunctionName};`
    }
    return code
  }

  const createPreviewHTML = (code: string) => {
    const codeWithExport = appendComponentExport(code)
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Preview</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: system-ui, -apple-system, sans-serif;
      background: white;
    }
    .error {
      color: #dc2626;
      background: #fef2f2;
      border: 1px solid #fecaca;
      padding: 16px;
      border-radius: 8px;
      margin: 20px;
      font-family: monospace;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  
  <script type="text/babel">
    const { useState, useEffect, useRef, useCallback, useMemo } = React;
    // Override console methods to capture output
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    console.log = (...args) => {
      originalLog(...args);
      window.parent.postMessage({
        type: 'console',
        method: 'log',
        args: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg))
      }, '*');
    };
    console.error = (...args) => {
      originalError(...args);
      window.parent.postMessage({
        type: 'console',
        method: 'error',
        args: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg))
      }, '*');
    };
    console.warn = (...args) => {
      originalWarn(...args);
      window.parent.postMessage({
        type: 'console',
        method: 'warn',
        args: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg))
      }, '*');
    };
    // --- User code injected below ---
${codeWithExport}
    // --- End user code ---
    try {
      const root = ReactDOM.createRoot(document.getElementById('root'));
      if (window.Component) {
        root.render(React.createElement(window.Component));
      } else {
        root.render(React.createElement('div', null, 'No component found to render'));
      }
      window.parent.postMessage({ type: 'success' }, '*');
    } catch (error) {
      console.error('Preview Error:', error);
      document.getElementById('root').innerHTML = 
        '<div class="error">Error: ' + error.message + '</div>';
      window.parent.postMessage({ 
        type: 'error', 
        message: error.message,
        stack: error.stack 
      }, '*');
    }
  </script>
</body>
</html>`
  }

  useEffect(() => {
    setIsLoading(true)
    setError(null)

    const timer = setTimeout(() => {
      if (iframeRef.current) {
        const html = createPreviewHTML(code)
        const blob = new Blob([html], { type: "text/html" })
        const url = URL.createObjectURL(blob)
        iframeRef.current.src = url

        return () => URL.revokeObjectURL(url)
      }
    }, 500) // Debounce updates

    return () => clearTimeout(timer)
  }, [code])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "error") {
        setError(event.data.message)
        setIsLoading(false)
      } else if (event.data.type === "success") {
        setError(null)
        setIsLoading(false)
      } else if (event.data.type === "console" && onConsoleOutput) {
        const output = `[${event.data.method.toUpperCase()}] ${event.data.args.join(" ")}`
        if (typeof onConsoleOutput === "function") {
          // Use a ref to store the last output if needed, but here just call with new array
          onConsoleOutput([output])
        }
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [onConsoleOutput])

  const refreshPreview = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-2 bg-muted/20 flex items-center justify-between">
        <span className="text-sm font-medium">Preview</span>
        <Button size="sm" variant="ghost" onClick={refreshPreview}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Updating preview...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute top-4 left-4 right-4 z-20">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="font-mono text-sm">{error}</AlertDescription>
            </Alert>
          </div>
        )}

        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
          title="Live Preview"
        />
      </div>
    </div>
  )
}
