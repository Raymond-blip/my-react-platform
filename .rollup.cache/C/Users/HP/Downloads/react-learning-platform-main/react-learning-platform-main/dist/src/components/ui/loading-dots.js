"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export function LoadingDots({ className, size = "md" }) {
    const sizes = {
        sm: "h-1 w-1",
        md: "h-2 w-2",
        lg: "h-3 w-3",
    };
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
    };
    const circleVariants = {
        start: {
            y: "0%",
        },
        end: {
            y: "100%",
        },
    };
    const circleTransition = {
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
    };
    return (_jsx(motion.div, { className: cn("flex space-x-1", className), variants: containerVariants, initial: "start", animate: "end", children: [0, 1, 2].map((index) => (_jsx(motion.div, { className: cn("rounded-full bg-primary", sizes[size]), variants: circleVariants, transition: circleTransition }, index))) }));
}
//# sourceMappingURL=loading-dots.js.map