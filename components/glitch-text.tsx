"use client"

import { useEffect, useState } from "react"
import { useGlitchText } from "@/hooks/use-glitch-text"
import { ReactNode } from "react";
import { Children } from "react";
import { isValidElement } from "react";

const getPlainText = (children: ReactNode): string => {
  return Children.toArray(children)
    .map(child => {
      if (typeof child === 'string' || typeof child === 'number') {
        return child;
      }
      if (isValidElement<{ children?: ReactNode }>(child) && child.props.children) {
        return getPlainText(child.props.children);
      }
      return '';
    })
    .join('');
};

interface GlitchTextProps {
  children: ReactNode
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
  bracket = false,
}: GlitchTextProps) {
  const rawText = getPlainText(children)
  const textToGlitch = bracket ? `[ ${rawText} ]` : rawText
  const {
    displayText,
    isComplete,
    isGlitching,
    hasStarted,
    showInitialFlash,
  } = useGlitchText(
    textToGlitch,
    debugMode ? 0 : delay,
    shouldStart,
  )

  const [shouldBeVisible, setShouldBeVisible] = useState(debugMode)

  useEffect(() => {
    if (isComplete && onComplete) {
      onComplete()
    }
  }, [isComplete, onComplete])

  useEffect(() => {
    if ((hasStarted || debugMode) && !shouldBeVisible) {
      setShouldBeVisible(true)
    }
  }, [hasStarted, shouldBeVisible, debugMode])

  // 🔧 Always render brackets properly in debug mode too
  const renderFinalText = () => {
    if (bracket) {
      return (
        <span className="bracket-interactive px-0.5">
          <span className="bracket-accent font-extralight">[</span>
          <span className="bracket-content text-theme-secondary">{rawText}</span>
          <span className="bracket-accent font-extralight">]</span>
        </span>
      )
    }
    return rawText
  }

  if (debugMode) {
    return <span className={className}>{renderFinalText()}</span>
  }

  return (
    <span
      className={`${className} ${showInitialFlash ? "glitch-flash-start" : ""} ${
        shouldBeVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {hasStarted ? (
        <>
          {bracket && isComplete ? renderFinalText() : textToGlitch}
        </>
      ) : (
        <span>{textToGlitch}</span>
      )}
    </span>
  )
}
