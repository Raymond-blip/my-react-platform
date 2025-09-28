"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Save, Share, RotateCcw, Play, PanelLeftClose, Download, Settings } from "lucide-react"
import { motion } from "framer-motion"

interface PlaygroundToolbarProps {
  onSave: () => void
  onShare: () => void
  onReset: () => void
  onToggleSidebar: () => void
}

export function PlaygroundToolbar({ onSave, onShare, onReset, onToggleSidebar }: PlaygroundToolbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={onToggleSidebar}>
            <PanelLeftClose className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <Play className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">React Playground</span>
            <Badge variant="secondary" className="text-xs">
              Live
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={onReset}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button size="sm" variant="ghost">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" variant="ghost" onClick={onSave}>
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button size="sm" variant="ghost" onClick={onShare}>
            <Share className="h-4 w-4" />
            Share
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button size="sm" variant="ghost">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
