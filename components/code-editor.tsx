"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  language?: string
  readOnly?: boolean
}

export function CodeEditor({ code, onChange, language = "tsx", readOnly = false }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [code])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const textarea = e.currentTarget
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newValue = code.substring(0, start) + "  " + code.substring(end)
      onChange(newValue)

      // Set cursor position after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2
      }, 0)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          className="w-full h-full p-4 font-mono text-sm bg-background border-0 resize-none outline-none"
          style={{
            minHeight: "100%",
            lineHeight: "1.5",
            tabSize: 2,
          }}
          placeholder="Start coding your React component..."
          spellCheck={false}
        />
        {/* Line numbers overlay could go here */}
        <div className="absolute top-0 left-0 p-4 pointer-events-none text-muted-foreground/30 font-mono text-sm select-none">
          {code.split("\n").map((_, index) => (
            <div key={index} style={{ lineHeight: "1.5" }}>
              {index + 1}
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-8 w-px h-full bg-border" />
      </div>
    </div>
  )
}
