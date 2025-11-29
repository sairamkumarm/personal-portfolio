"use client"

import { useState, useEffect, ReactNode, useRef, Children, isValidElement, cloneElement } from "react"

// Helper to extract plain text from React nodes for the scramble effect.
const getPlainText = (children: ReactNode): string => {
  return Children.toArray(children)
    .map(child => {
      if (typeof child === 'string' || typeof child === 'number') {
        return child
      }
      if (isValidElement<{ children?: ReactNode }>(child) && child.props.children) {
        return getPlainText(child.props.children)
      }
      return ''
    })
    .join('')
}

// const CHARS = "!<>-_\/[]{}—=+*^?#________"
const CHARS = "&*%$#@!ABCDEFGHIJKLMNOPQRSTUVWXYZ"
// Duration for the gibberish wave to sweep across the text.
const GIBBERISH_SWEEP_DURATION = 300 
// The delay (lag) between the gibberish wave and the reveal wave.
const REVEAL_LAG_MS = 500 

interface CharState {
  originalChar: string
  scrambledChar: string
  timeToBecomeGibberish: number
  timeToBecomeRevealed: number
}

interface DecodeTextNonCycledProps {
  children: ReactNode
  delay?: number
  className?: string
  shouldStart?: boolean
  debugMode?: boolean
  bracket?: boolean
}

export function DecodeTextNonCycled({
  children,
  delay = 0,
  className = "",
  shouldStart = true,
  debugMode = false,
  bracket = false,
}: DecodeTextNonCycledProps) {
  const [content, setContent] = useState<ReactNode | null>(null)
  const hasCompletedRef = useRef(false)
  const charStatesRef = useRef<CharState[] | null>(null)
  const totalDurationRef = useRef(0)

  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const plainText = getPlainText(children)

  // Effect 1: Create the detailed animation plan for each character
  useEffect(() => {
    hasCompletedRef.current = false
    setContent(null)
    startTimeRef.current = null
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    const animationPlan: CharState[] = plainText.split('').map((char, index) => {
      const timeToBecomeGibberish = (index / plainText.length) * GIBBERISH_SWEEP_DURATION
      return {
        originalChar: char,
        scrambledChar: char!=" "?CHARS[Math.floor(Math.random() * CHARS.length)]:char,
        timeToBecomeGibberish: timeToBecomeGibberish,
        timeToBecomeRevealed: timeToBecomeGibberish + REVEAL_LAG_MS,
      }
    })
    charStatesRef.current = animationPlan

    // Calculate total duration based on the last character's reveal time
    totalDurationRef.current = animationPlan.length > 0 ? animationPlan[animationPlan.length - 1].timeToBecomeRevealed : 0;

  }, [plainText])

  // Effect 2: Run the animation based on the pre-built plan
  useEffect(() => {
    if (hasCompletedRef.current || !shouldStart) {
      if (hasCompletedRef.current) setContent(children)
      return
    }

    if (debugMode) {
      hasCompletedRef.current = true
      setContent(children)
      return
    }

    const animate = (time: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = time
      }

      const elapsedTime = time - startTimeRef.current
      const animationPlan = charStatesRef.current
      if (!animationPlan) return

      const totalDuration = totalDurationRef.current
      const progress = Math.min(elapsedTime / totalDuration, 1)

      if (progress < 1) {
        let displayText = ""
        for (const state of animationPlan) {
          if (elapsedTime >= state.timeToBecomeRevealed) {
            displayText += state.originalChar
          } else if (elapsedTime >= state.timeToBecomeGibberish) {
            displayText += state.scrambledChar
          } else {
            // Use a non-breaking space to hold layout before gibberish appears
            displayText += '\u00A0' 
          }
        }

        let animatedContent: ReactNode = displayText
        if (isValidElement(children)) {
          animatedContent = cloneElement(children, {}, displayText)
        }

        setContent(animatedContent)
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        hasCompletedRef.current = true
        setContent(children)
      }
    }

    const startTimeout = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [children, shouldStart, delay, debugMode, plainText])

  const renderWithBrackets = (contentToRender: ReactNode) => {
    if (!bracket) return contentToRender
    return (
      <span className="bracket-interactive px-0.5">
        <span className="bracket-accent font-extralight">[</span>
        <span className="bracket-content">{contentToRender}</span>
        <span className="bracket-accent font-extralight">]</span>
      </span>
    )
  }

  return (
    <span className={className}>
      {content === null ? (
        <span className="opacity-0" aria-hidden="true">
          {renderWithBrackets(children)}
        </span>
      ) : (
        renderWithBrackets(content)
      )}
    </span>
  )
}
