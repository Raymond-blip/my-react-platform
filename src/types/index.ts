// Common types for the component library
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface VariantProps {
  variant?: string
  size?: string
}

// Re-export common React types
export type { ComponentProps, ReactNode, FC, ComponentType } from 'react'
