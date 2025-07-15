"use client"

import { useState, useEffect, useRef } from "react"

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?~`"
const RENDER_SPEED=0 // milliseconds per character
const GLITCH_ITERATIONS=0 // number of random chars before correct one

export function useGlitchText(text: string, startDelay = 0, shouldStart = true) {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [showInitialFlash, setShowInitialFlash] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const hasInitialized = useRef(false)
  const isAnimationComplete = useRef(false)

  useEffect(() => {
    // If animation is already complete, ensure we show the final text
    if (isAnimationComplete.current) {
      setDisplayText(text)
      setIsComplete(true)
      setHasStarted(true)
      setIsGlitching(false)
      return
    }

    // Only initialize once when shouldStart becomes true
    if (!text || !shouldStart || hasInitialized.current) return

    hasInitialized.current = true

    const startAnimation = () => {
      setHasStarted(true)
      setShowInitialFlash(true)

      // Turn off initial flash after brief moment
      setTimeout(() => {
        setShowInitialFlash(false)
      }, 400)

      let charIndex = 0

      const animateNextChar = () => {
        if (charIndex >= text.length) {
          setDisplayText(text) // Ensure final text is set
          setIsComplete(true)
          setIsGlitching(false)
          isAnimationComplete.current = true
          return
        }

        const targetChar = text[charIndex]
        let glitchCount = 0
        setIsGlitching(true)

        const glitchChar = () => {
          if (glitchCount < GLITCH_ITERATIONS) {
            // Show random glitch character temporarily
            const randomChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            const correctPortion = text.slice(0, charIndex)
            setDisplayText(correctPortion + randomChar)
            glitchCount++

            timeoutRef.current = setTimeout(glitchChar, RENDER_SPEED / 4)
          } else {
            // Set the correct character permanently
            const correctText = text.slice(0, charIndex + 1)
            setDisplayText(correctText)
            charIndex++
            setIsGlitching(false)

            timeoutRef.current = setTimeout(animateNextChar, RENDER_SPEED)
          }
        }

        glitchChar()
      }

      animateNextChar()
    }

    timeoutRef.current = setTimeout(startAnimation, startDelay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [text, startDelay, shouldStart])

  // Reset only when text actually changes
  useEffect(() => {
    hasInitialized.current = false
    isAnimationComplete.current = false
    setDisplayText("")
    setIsComplete(false)
    setIsGlitching(false)
    setHasStarted(false)
    setShowInitialFlash(false)
  }, [text])

  return { displayText, isComplete, isGlitching, hasStarted, showInitialFlash }
}
