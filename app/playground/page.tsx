"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { CodeEditor } from "@/components/code-editor"
import { LivePreview } from "@/components/live-preview"
import { PlaygroundToolbar } from "@/components/playground-toolbar"
import { PlaygroundSidebar } from "@/components/playground-sidebar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { PanelLeftOpen } from "lucide-react"

const defaultCode = `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h2 style={{ color: '#2563eb', marginBottom: '20px' }}>
        React Counter
      </h2>
      <div style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold',
        margin: '20px 0',
        color: '#1f2937'
      }}>
        Count: {count}
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={() => setCount(count - 1)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Decrease
        </button>
        <button 
          onClick={() => setCount(0)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Reset
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Increase
        </button>
      </div>
    </div>
  );
}

export default Counter;`

export default function PlaygroundPage() {
  const [code, setCode] = useState(defaultCode)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeFile, setActiveFile] = useState("App.jsx")
  const [files, setFiles] = useState({
    "App.jsx": defaultCode,
    "styles.css": `/* Add your custom styles here */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}

.button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}`,
  })
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    setFiles((prev) => ({ ...prev, [activeFile]: newCode }))
  }

  const handleFileSelect = (fileName: string) => {
    setActiveFile(fileName)
    setCode(files[fileName] || "")
  }

  const handleTemplateLoad = (template: { name: string; code: string }) => {
    setCode(template.code)
    setFiles((prev) => ({ ...prev, [activeFile]: template.code }))
  }

  return (
    <div className="flex-1 flex flex-col bg-background min-h-0">
      <Navigation />

      <div className="flex-1 flex flex-col min-h-0">
        {/* Toolbar */}
        <PlaygroundToolbar
          onSave={() => console.log("Save functionality")}
          onShare={() => console.log("Share functionality")}
          onReset={() => {
            setCode(defaultCode)
            setFiles((prev) => ({ ...prev, [activeFile]: defaultCode }))
          }}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main Content */}
        <div className="flex-1 flex min-h-0">
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            {/* Sidebar */}
            {sidebarOpen && (
              <>
                <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                  <PlaygroundSidebar
                    files={files}
                    activeFile={activeFile}
                    onFileSelect={handleFileSelect}
                    onTemplateLoad={handleTemplateLoad}
                  />
                </ResizablePanel>
                <ResizableHandle />
              </>
            )}

            {/* Editor */}
            <ResizablePanel defaultSize={sidebarOpen ? 40 : 50} minSize={30}>
              <div className="h-full flex flex-col">
                <div className="border-b p-2 bg-muted/20">
                  <div className="flex items-center gap-2">
                    {!sidebarOpen && (
                      <Button size="sm" variant="ghost" onClick={() => setSidebarOpen(true)}>
                        <PanelLeftOpen className="h-4 w-4" />
                      </Button>
                    )}
                    <span className="text-sm font-medium">{activeFile}</span>
                  </div>
                </div>
                <CodeEditor code={code} onChange={handleCodeChange} language="tsx" />
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* Preview */}
            <ResizablePanel defaultSize={40} minSize={30}>
              <Tabs defaultValue="preview" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="console">Console</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="flex-1 m-0">
                  <LivePreview code={code} onConsoleOutput={setConsoleOutput} />
                </TabsContent>
                <TabsContent value="console" className="flex-1 m-0">
                  <div className="h-full p-4 bg-black text-green-400 font-mono text-sm overflow-auto">
                    {consoleOutput.length === 0 ? (
                      <div className="text-gray-500">Console output will appear here...</div>
                    ) : (
                      consoleOutput.map((output, index) => (
                        <div key={index} className="mb-1">
                          {output}
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  )
}
