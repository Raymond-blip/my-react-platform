import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { VoteButtons } from "@/components/vote-buttons"
import { MessageSquare, Eye, Clock } from "lucide-react"
import type { ForumPost as ForumPostType } from "@/lib/forum-data"

interface ForumPostProps {
  post: ForumPostType
}

export function ForumPost({ post }: ForumPostProps) {
  const timeAgo = new Date(post.createdAt).toLocaleDateString()

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Vote Buttons */}
          <VoteButtons votes={post.votes} postId={post.id} />

          {/* Post Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="secondary">{post.category}</Badge>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.solved && <Badge className="bg-green-500 hover:bg-green-600">✓ Solved</Badge>}
            </div>

            <Link href={`/community/${post.id}`}>
              <h3 className="text-lg font-semibold hover:text-primary transition-colors mb-2 line-clamp-2">
                {post.title}
              </h3>
            </Link>

            <p className="text-muted-foreground mb-4 line-clamp-2">{post.content}</p>

            {/* Post Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.replies} replies</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.views} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{timeAgo}</span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{post.author.name}</span>
                <Badge variant="outline" className="text-xs">
                  {post.author.reputation}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
