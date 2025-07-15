import type React from "react"
interface BracketedContentProps {
  children: React.ReactNode
  className?: string
}

export function BracketedContent({ children, className = "" }: BracketedContentProps) {
  return (
    <span className={`text-theme-accent ${className}`}>
      [ <span className="text-theme-primary">{children}</span> ]
    </span>
  )
}
BracketedContent.displayName = "BracketedContent"
