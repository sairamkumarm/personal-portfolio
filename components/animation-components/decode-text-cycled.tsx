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

const CHARS = "!<>-_[]{}—=+*^?#@;: "
const ANIMATION_DURATION = 800

interface DecodeTextCycledProps {
  children: ReactNode
  delay?: number
  className?: string
  shouldStart?: boolean
  debugMode?: boolean
  bracket?: boolean
}

export function DecodeTextCycled({
  children,
  delay = 0,
  className = "",
  shouldStart = true,
  debugMode = false,
  bracket = false,
}: DecodeTextCycledProps) {
  const [content, setContent] = useState<ReactNode | null>(null)
  const hasCompletedRef = useRef(false)
  
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const plainText = getPlainText(children)

  // Effect 1: Reset the component state ONLY when the text content changes.
  // This ensures a new animation can run if the children are different.
  useEffect(() => {
    hasCompletedRef.current = false
    setContent(null)
    startTimeRef.current = null
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [plainText])

  // Effect 2: Handle the animation itself.
  useEffect(() => {
    // THE LOCK: If animation is already complete, or shouldn't start, do nothing.
    if (hasCompletedRef.current || !shouldStart) {
      if (hasCompletedRef.current) setContent(children) // ensure final state is set
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
      const progress = Math.min(elapsedTime / ANIMATION_DURATION, 1)

      if (progress < 1) {
        const revealCount = Math.floor(plainText.length * progress)
        const scrambledText = plainText.split('').map((char, index) => {
          if (index < revealCount) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')

        let animatedContent: ReactNode = scrambledText
        if (isValidElement(children)) {
          animatedContent = cloneElement(children, {}, scrambledText)
        }

        setContent(animatedContent)
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        hasCompletedRef.current = true // Engage the lock
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
  // Rerun ONLY when start conditions change. `plainText` is handled by the other effect.
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
