
import { motion } from "framer-motion"
import { cn } from "../../utils"

interface LoadingDotsProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingDots({ className, size = "md" }: LoadingDotsProps) {
  const sizes = {
    sm: "h-1 w-1",
    md: "h-2 w-2",
    lg: "h-3 w-3",
  }

  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const circleVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  }

  const circleTransition = {
    duration: 0.5,
    repeat: Number.POSITIVE_INFINITY,
    repeatType: "reverse" as const,
    ease: "easeInOut",
  }

  return (
    <motion.div className={cn("flex space-x-1", className)} variants={containerVariants} initial="start" animate="end">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={cn("rounded-full bg-primary", sizes[size])}
          variants={circleVariants}
          transition={circleTransition}
        />
      ))}
    </motion.div>
  )
}
