"use client"

import { useEffect, useState } from "react"
import { useGlitchText } from "@/hooks/use-glitch-text"

interface GlitchTextProps {
  children: string
  delay?: number
  className?: string
  onComplete?: () => void
  shouldStart?: boolean
  debugMode?: boolean
  bracket?: boolean
}

export function GlitchText({
  children,
  delay = 0,
  className = "",
  onComplete,
  shouldStart = true,
  debugMode = false,
  bracket,
}: GlitchTextProps) {
  const rawText = children
  const textToGlitch = bracket ? `[ ${rawText} ]` : rawText
  const { displayText, isComplete, isGlitching, hasStarted, showInitialFlash } = useGlitchText(
    textToGlitch,
    debugMode ? 0 : delay,
    shouldStart,
  )

  // Track if this element should be visible - once true, stays true forever
  const [shouldBeVisible, setShouldBeVisible] = useState(debugMode)

  // Move onComplete to useEffect to avoid side effects during render
  useEffect(() => {
    if (isComplete && onComplete) {
      onComplete()
    }
  }, [isComplete, onComplete])

  // Once hasStarted becomes true, make it permanently visible
  useEffect(() => {
    if ((hasStarted || debugMode) && !shouldBeVisible) {
      setShouldBeVisible(true)
    }
  }, [hasStarted, shouldBeVisible, debugMode])

  // In debug mode, skip all animations and show final text immediately
  if (debugMode) {
    return <span className={className}>{children}</span>
  }

  return (
    <span
      className={`${className} ${showInitialFlash ? "glitch-flash-start" : ""} ${shouldBeVisible ? "opacity-100" : "opacity-0"}`}
    >
      {hasStarted ? (
        <>
          {bracket && isComplete ? (
            <span className="bracket-interactive px-0.5">
              <span className="bracket-accent">[</span>
              <span className="bracket-content">{rawText}</span>
              <span className="bracket-accent">]</span>
            </span>
          ) : (
      textToGlitch
          )}
          
        </>
      ) : (
        <span>{textToGlitch}</span>
      )}
    </span>
  )
}
