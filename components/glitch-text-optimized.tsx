"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useGlitchText } from "@/hooks/use-glitch-text" // USING THE ORIGINAL HOOK!

interface GlitchTextOptimizedProps {
  children: string
  delay?: number
  className?: string
  onComplete?: () => void
  shouldStart?: boolean
  debugMode?: boolean
}

export function GlitchTextOptimized({
  children,
  delay = 0,
  className = "",
  onComplete,
  shouldStart = true,
  debugMode = false,
}: GlitchTextOptimizedProps) {
  // USING THE EXACT SAME HOOK AS CLASSIC VERSION!
  const { displayText, isComplete, isGlitching, hasStarted, showInitialFlash } = useGlitchText(
    children,
    debugMode ? 0 : delay,
    shouldStart,
  )

  // Track if this element should be visible - once true, stays true forever (EXACT SAME LOGIC AS ORIGINAL)
  const [shouldBeVisible, setShouldBeVisible] = useState(debugMode)

  // Move onComplete to useEffect to avoid side effects during render (EXACT SAME AS ORIGINAL)
  useEffect(() => {
    if (isComplete && onComplete) {
      onComplete()
    }
  }, [isComplete, onComplete])

  // Once hasStarted becomes true, make it permanently visible (EXACT SAME LOGIC AS ORIGINAL)
  useEffect(() => {
    if ((hasStarted || debugMode) && !shouldBeVisible) {
      setShouldBeVisible(true)
    }
  }, [hasStarted, shouldBeVisible, debugMode])

  // Reset when text changes (SAME PATTERN AS ORIGINAL)
  useEffect(() => {
    setShouldBeVisible(debugMode)
  }, [children, debugMode])

  // In debug mode, skip all animations and show final text immediately (EXACT SAME AS ORIGINAL)
  if (debugMode) {
    return <span className={className}>{children}</span>
  }

  return (
    <span
      className={`${className} ${showInitialFlash ? "glitch-flash-start" : ""} ${shouldBeVisible ? "opacity-100" : "opacity-0"}`}
    >
      {hasStarted ? (
        <>
          {/* OPTIMIZED: Use CSS animation instead of displayText */}
          <span
            className="inline-block glitch-text-optimized"
            style={{ "--text-content": `"${children}"` } as React.CSSProperties}
          >
            {children}
          </span>
          {/* SAME: Use isComplete to control flicker, just like original */}
          {!isComplete && <span className="flicker">█</span>}
        </>
      ) : (
        <span>{children}</span>
      )}
    </span>
  )
}
