"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface RenderSequenceProps {
  children: React.ReactNode
  phase: "lines" | "text" | "interactive"
  delay?: number
  className?: string
}

export function RenderSequence({ children, phase, delay = 0, className = "" }: RenderSequenceProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (!isVisible) return null

  const getPhaseClass = () => {
    switch (phase) {
      case "lines":
        return "glitch-line"
      case "text":
        return ""
      case "interactive":
        return "render-delay-1"
      default:
        return ""
    }
  }

  return <div className={`${className} ${getPhaseClass()}`}>{children}</div>
}
