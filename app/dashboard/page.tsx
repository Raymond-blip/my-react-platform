"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, User, BookOpen, Zap, Target } from "lucide-react"
import { motion } from "framer-motion"


const LESSONS = [
  "intro",
  "first-component",
  "jsx",
  "props-state",
  "events",
  "conditional",
  "lists",
  "forms",
]

function getProgress() {
  if (typeof window !== "undefined") {
    const completed = JSON.parse(localStorage.getItem("completedLessons") || "[]")
    return completed
  }
  return []
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const completedLessons = typeof window !== "undefined" ? getProgress() : []
  const lessonsCompleted = completedLessons.length
  const totalLessons = LESSONS.length
  const progress = Math.round((lessonsCompleted / totalLessons) * 100)
  const achievements = [
    ...(lessonsCompleted >= 1 ? ["React Beginner"] : []),
    ...(lessonsCompleted >= 3 ? ["JSX Pro"] : []),
    ...(lessonsCompleted >= 5 ? ["Hooks Master"] : []),
  ]
  const leaderboardRank = 7 // Demo value
  const quizzesPassed = 5 // Demo value

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                {session?.user?.image && (
                  <img src={session.user.image} alt="avatar" className="h-10 w-10 rounded-full border-2 border-primary" />
                )}
                <div>
                  <CardTitle className="text-2xl font-bold">{session?.user?.name || session?.user?.email || "Your Profile"}</CardTitle>
                  <Badge variant="secondary" className="mt-1">Learning Dashboard</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="font-semibold">Progress:</span>
                <Progress value={progress} className="mt-2" />
                <div className="text-right text-sm mt-2 text-primary font-semibold">{progress}% Complete</div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex flex-col items-center">
                  <BookOpen className="h-6 w-6 text-blue-500 mb-1" />
                  <span className="font-semibold">Lessons</span>
                  <span>{lessonsCompleted} / {totalLessons}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Zap className="h-6 w-6 text-yellow-500 mb-1" />
                  <span className="font-semibold">Quizzes</span>
                  <span>{quizzesPassed}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Trophy className="h-6 w-6 text-green-500 mb-1" />
                  <span className="font-semibold">Achievements</span>
                  <span>{achievements.length}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Target className="h-6 w-6 text-purple-500 mb-1" />
                  <span className="font-semibold">Leaderboard</span>
                  <span>#{leaderboardRank}</span>
                </div>
              </div>
              <div className="mt-8">
                <span className="font-semibold">Achievements:</span>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {achievements.map((ach, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">{ach}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
