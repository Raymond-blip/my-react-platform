export const templates = [
  {
    id: "modern-dashboard",
    title: "Modern Analytics Dashboard",
    description:
      "A comprehensive dashboard with charts, metrics, and real-time data visualization. Perfect for admin panels and business intelligence applications.",
    category: "dashboard",
    difficulty: "intermediate" as const,
    tags: ["dashboard", "charts", "analytics", "responsive", "dark-mode"],
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    },
    likes: 1247,
    views: 8934,
    downloads: 456,
    createdAt: "2025-01-15",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    demoUrl: "https://modern-dashboard-demo.vercel.app",
  },
  {
    id: "ecommerce-store",
    title: "E-commerce Store Frontend",
    description:
      "Complete e-commerce solution with product catalog, shopping cart, checkout flow, and user authentication. Built with modern React patterns.",
    category: "ecommerce",
    difficulty: "advanced" as const,
    tags: ["ecommerce", "shopping-cart", "authentication", "payments", "responsive"],
    author: {
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    likes: 2156,
    views: 15678,
    downloads: 789,
    createdAt: "2025-01-10",
    image: "https://images.unsplash.com/photo-1556742004584-a241de8bcf5d?w=600&h=400&fit=crop",
    demoUrl: "https://ecommerce-demo.vercel.app",
  },
  {
    id: "react-tetris",
    title: "React Tetris Game",
    description:
      "Classic Tetris game built with React hooks and canvas. Features scoring, levels, and smooth animations. Great for learning game development concepts.",
    category: "game",
    difficulty: "intermediate" as const,
    tags: ["game", "canvas", "hooks", "animation", "tetris"],
    author: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    likes: 892,
    views: 5432,
    downloads: 234,
    createdAt: "2025-01-08",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=400&fit=crop",
    demoUrl: "https://react-tetris-demo.vercel.app",
  },
  {
    id: "animated-portfolio",
    title: "Animated Portfolio Website",
    description:
      "Stunning portfolio website with smooth animations, parallax effects, and interactive elements. Perfect for showcasing creative work.",
    category: "animation",
    difficulty: "intermediate" as const,
    tags: ["portfolio", "animations", "framer-motion", "parallax", "creative"],
    author: {
      name: "Emma Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    likes: 1534,
    views: 9876,
    downloads: 567,
    createdAt: "2025-01-12",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    demoUrl: "https://animated-portfolio-demo.vercel.app",
  },
  {
    id: "ai-chat-interface",
    title: "AI Chat Interface",
    description:
      "Modern chat interface for AI applications with message streaming, code highlighting, and file uploads. Includes typing indicators and message reactions.",
    category: "ai",
    difficulty: "advanced" as const,
    tags: ["ai", "chat", "streaming", "websockets", "real-time"],
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    },
    likes: 1876,
    views: 12345,
    downloads: 678,
    createdAt: "2025-01-14",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    demoUrl: "https://ai-chat-demo.vercel.app",
  },
  {
    id: "multi-step-form",
    title: "Multi-Step Form Wizard",
    description:
      "Complex form with multiple steps, validation, progress tracking, and data persistence. Includes file uploads and conditional fields.",
    category: "form",
    difficulty: "intermediate" as const,
    tags: ["form", "validation", "multi-step", "wizard", "file-upload"],
    author: {
      name: "Lisa Wang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
    },
    likes: 743,
    views: 4567,
    downloads: 289,
    createdAt: "2025-01-11",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop",
    demoUrl: "https://multi-step-form-demo.vercel.app",
  },
  {
    id: "task-management",
    title: "Task Management App",
    description:
      "Full-featured task management application with drag-and-drop, categories, due dates, and team collaboration. Perfect for productivity apps.",
    category: "productivity",
    difficulty: "advanced" as const,
    tags: ["tasks", "drag-drop", "productivity", "collaboration", "calendar"],
    author: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
    },
    likes: 1123,
    views: 7890,
    downloads: 445,
    createdAt: "2025-01-09",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    demoUrl: "https://task-management-demo.vercel.app",
  },
]

export const templateCategories = [
  { id: "all", name: "All Templates", count: templates.length },
  { id: "dashboard", name: "Dashboards", count: templates.filter((t) => t.category === "dashboard").length },
  { id: "ecommerce", name: "E-commerce", count: templates.filter((t) => t.category === "ecommerce").length },
  { id: "game", name: "Games", count: templates.filter((t) => t.category === "game").length },
  { id: "animation", name: "Animations", count: templates.filter((t) => t.category === "animation").length },
  { id: "ai", name: "AI Apps", count: templates.filter((t) => t.category === "ai").length },
  { id: "form", name: "Forms", count: templates.filter((t) => t.category === "form").length },
  { id: "productivity", name: "Productivity", count: templates.filter((t) => t.category === "productivity").length },
]

export const difficultyLevels = ["beginner", "intermediate", "advanced"] as const

export type Template = (typeof templates)[0]
export type TemplateCategory = (typeof templateCategories)[0]
export type DifficultyLevel = (typeof difficultyLevels)[number]
