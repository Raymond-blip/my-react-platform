"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, SortAsc } from "lucide-react"

interface TemplateFiltersProps {
  selectedDifficulty: string
  onDifficultyChange: (difficulty: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

export function TemplateFilters({
  selectedDifficulty,
  onDifficultyChange,
  sortBy,
  onSortChange,
}: TemplateFiltersProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Filter:</span>
      </div>

      <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="beginner">Beginner</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-1">
        <SortAsc className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Sort:</span>
      </div>

      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="recent">Most Recent</SelectItem>
          <SelectItem value="difficulty">Difficulty</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
