"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown } from "lucide-react"

interface VoteButtonsProps {
  votes: number
  postId: string
}

export function VoteButtons({ votes, postId }: VoteButtonsProps) {
  const [currentVotes, setCurrentVotes] = useState(votes)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      // Remove vote
      setCurrentVotes((prev) => prev + (type === "up" ? -1 : 1))
      setUserVote(null)
    } else if (userVote === null) {
      // Add vote
      setCurrentVotes((prev) => prev + (type === "up" ? 1 : -1))
      setUserVote(type)
    } else {
      // Change vote
      setCurrentVotes((prev) => prev + (type === "up" ? 2 : -2))
      setUserVote(type)
    }
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote("up")}
        className={`h-8 w-8 p-0 ${userVote === "up" ? "text-green-500 bg-green-50" : ""}`}
      >
        <ChevronUp className="h-4 w-4" />
      </Button>

      <span
        className={`text-sm font-medium ${
          currentVotes > 0 ? "text-green-600" : currentVotes < 0 ? "text-red-600" : "text-muted-foreground"
        }`}
      >
        {currentVotes}
      </span>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote("down")}
        className={`h-8 w-8 p-0 ${userVote === "down" ? "text-red-500 bg-red-50" : ""}`}
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  )
}
