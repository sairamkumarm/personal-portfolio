"use client"

import { useState, useEffect } from "react"

interface GlitchImageProps {
  src: string
  alt: string
  delay?: number
  shouldStart?: boolean
  debugMode?: boolean
  className?: string
}
export function GlitchImage({
  src,
  alt,
  delay = 0,
  shouldStart = true,
  debugMode = false,
  className = "",
}: GlitchImageProps) {
  const [isVisible, setIsVisible] = useState(debugMode)
  const [shouldGlitchIn, setShouldGlitchIn] = useState(false)

  useEffect(() => {
    if (!shouldStart || debugMode) return

    const timer = setTimeout(() => {
      setIsVisible(true)
      setShouldGlitchIn(true)

      setTimeout(() => {
        setShouldGlitchIn(false)
      }, 500)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, shouldStart, debugMode])

  return (
    <div className={`relative overflow-hidden ${className} ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className="w-full h-full object-cover"
      />
      {shouldGlitchIn && !debugMode && (
        <div className="absolute inset-0 glitch-overlay z-10" />
      )}
    </div>
  )
}
