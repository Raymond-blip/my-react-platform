export interface ForumPost {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  author: {
    name: string
    avatar: string
    reputation: number
  }
  votes: number
  replies: number
  views: number
  solved: boolean
  createdAt: string
}

export const forumPosts: ForumPost[] = [
  {
    id: "1",
    title: "How to properly handle state updates in React hooks?",
    content:
      "I'm having trouble understanding when to use useState vs useReducer. Can someone explain the best practices for managing complex state in React components?",
    category: "hooks",
    tags: ["useState", "useReducer", "state-management"],
    author: {
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      reputation: 1250,
    },
    votes: 45,
    replies: 12,
    views: 234,
    solved: true,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Best practices for component composition in React",
    content:
      "I'm building a large React application and struggling with component organization. What are the best patterns for composing components and managing props drilling?",
    category: "components",
    tags: ["composition", "props", "architecture"],
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      reputation: 890,
    },
    votes: 32,
    replies: 8,
    views: 156,
    solved: false,
    createdAt: "2024-01-14T15:45:00Z",
  },
  {
    id: "3",
    title: "React 18 Concurrent Features - When to use them?",
    content:
      "I've been reading about React 18's concurrent features like Suspense, useTransition, and useDeferredValue. When should I actually use these in real applications?",
    category: "performance",
    tags: ["react-18", "concurrent", "suspense", "performance"],
    author: {
      name: "Mike Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      reputation: 2100,
    },
    votes: 67,
    replies: 15,
    views: 445,
    solved: true,
    createdAt: "2024-01-13T09:20:00Z",
  },
  {
    id: "4",
    title: "TypeScript with React: Generic components best practices",
    content:
      "I'm trying to create reusable generic components in TypeScript + React. What are the best patterns for typing props and ensuring type safety?",
    category: "typescript",
    tags: ["typescript", "generics", "components", "types"],
    author: {
      name: "Emma Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      reputation: 1560,
    },
    votes: 28,
    replies: 6,
    views: 189,
    solved: false,
    createdAt: "2024-01-12T14:10:00Z",
  },
  {
    id: "5",
    title: "Testing React components with Jest and React Testing Library",
    content:
      "I'm new to testing React components. Can someone share best practices for writing effective tests using Jest and React Testing Library?",
    category: "testing",
    tags: ["testing", "jest", "react-testing-library", "unit-tests"],
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      reputation: 750,
    },
    votes: 19,
    replies: 4,
    views: 123,
    solved: false,
    createdAt: "2024-01-11T11:30:00Z",
  },
  {
    id: "6",
    title: "Next.js App Router vs Pages Router - Migration guide?",
    content:
      "I have a large Next.js application using the Pages Router. What's the best approach to migrate to the new App Router? Are there any gotchas I should be aware of?",
    category: "nextjs",
    tags: ["nextjs", "app-router", "migration", "routing"],
    author: {
      name: "Lisa Wang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      reputation: 1890,
    },
    votes: 52,
    replies: 11,
    views: 367,
    solved: true,
    createdAt: "2024-01-10T16:45:00Z",
  },
]

export const forumCategories = [
  { id: "all", name: "All Categories", count: forumPosts.length },
  { id: "hooks", name: "Hooks", count: forumPosts.filter((p) => p.category === "hooks").length },
  { id: "components", name: "Components", count: forumPosts.filter((p) => p.category === "components").length },
  { id: "performance", name: "Performance", count: forumPosts.filter((p) => p.category === "performance").length },
  { id: "typescript", name: "TypeScript", count: forumPosts.filter((p) => p.category === "typescript").length },
  { id: "testing", name: "Testing", count: forumPosts.filter((p) => p.category === "testing").length },
  { id: "nextjs", name: "Next.js", count: forumPosts.filter((p) => p.category === "nextjs").length },
  { id: "styling", name: "Styling", count: 0 },
  { id: "deployment", name: "Deployment", count: 0 },
]

export type { ForumPost }
