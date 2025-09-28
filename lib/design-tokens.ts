// Design system tokens and utilities for the React learning platform

export const designTokens = {
  colors: {
    primary: {
      50: "oklch(0.985 0 0)",
      100: "oklch(0.922 0 0)",
      500: "oklch(0.269 0 0)",
      600: "oklch(0.205 0 0)",
      900: "oklch(0.145 0 0)",
    },
    secondary: {
      50: "oklch(0.985 0.05 264.376)",
      100: "oklch(0.922 0.1 264.376)",
      500: "oklch(0.646 0.222 264.376)",
      600: "oklch(0.577 0.222 264.376)",
      900: "oklch(0.439 0.222 264.376)",
    },
  },
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  animations: {
    fadeIn: "fadeIn 0.5s ease-in-out",
    slideUp: "slideUp 0.3s ease-out",
    bounce: "bounce 1s infinite",
  },
} as const

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const

// Utility functions for consistent spacing and sizing
export const getSpacing = (size: keyof typeof designTokens.spacing) => designTokens.spacing[size]
export const getBorderRadius = (size: keyof typeof designTokens.borderRadius) => designTokens.borderRadius[size]
export const getShadow = (size: keyof typeof designTokens.shadows) => designTokens.shadows[size]
