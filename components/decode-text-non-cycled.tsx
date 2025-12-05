"use client"

import {
  useState,
  useEffect,
  ReactNode,
  useRef,
  Children,
  isValidElement,
  cloneElement,
  useMemo,
} from "react"
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
// const CHARS = "&%$#@ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const CHARS = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"
// const CHARS = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ"
// Duration for the gibberish wave to sweep across the text.
const GIBBERISH_SWEEP_MS = 400 
// The delay (lag) between the gibberish wave and the reveal wave.
const REVEAL_LAG_MS = 3800 


const DEFAULT_IMMUTABLE_CHARS = new Set([
  " ", ".", ":", ";", ",", "!", "?", "'", '"', "`", "-", "_",
  "(", ")", "[", "]", "{", "}", "/", "\\",
  "@", "•", "⫻", "—", "⁝", "›", "&",
])

const getScrambleChar = (
  char: string,
  scramblePool: string,
  immutableChars: Set<string> = DEFAULT_IMMUTABLE_CHARS
): string => {
  if (immutableChars.has(char)) return char
  return scramblePool[Math.floor(Math.random() * scramblePool.length)]
}


interface CharState {
  original: string
  scrambled: string
  gibberishAt: number
  revealAt: number
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

  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const hasCompletedRef = useRef(false)
  const planRef = useRef<CharState[]>([])
  const totalDurationRef = useRef(0)

  const plainText = useMemo(() => getPlainText(children), [children])

  // Build animation plan
  useEffect(() => {
    hasCompletedRef.current = false
    startTimeRef.current = null
    setContent(null)

    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    if (!plainText.length) {
      totalDurationRef.current = 0
      planRef.current = []
      return
    }

    const plan: CharState[] = plainText.split("").map((char, index) => {
      const gibberishAt = (index / plainText.length) * GIBBERISH_SWEEP_MS
      const revealAt = gibberishAt + REVEAL_LAG_MS

      return {
        original: char,
        scrambled: getScrambleChar(char, CHARS),
        gibberishAt,
        revealAt,
      }
    })

    planRef.current = plan
    totalDurationRef.current = plan[plan.length - 1].revealAt
  }, [plainText])

  // Run animation
  useEffect(() => {
    if (!shouldStart) return

    if (debugMode) {
      setContent(children)
      hasCompletedRef.current = true
      return
    }

    if (!planRef.current.length) {
      setContent(children)
      return
    }

    const tick = (now: number) => {
      if (startTimeRef.current === null) startTimeRef.current = now
      const elapsed = now - startTimeRef.current

      const plan = planRef.current
      const duration = totalDurationRef.current

      if (elapsed >= duration) {
        hasCompletedRef.current = true
        setContent(children)
        return
      }

      const buffer = new Array(plan.length)

      for (let i = 0; i < plan.length; i++) {
      const state = plan[i]

      if (elapsed >= state.revealAt) {
        buffer[i] = state.original
      } else if (elapsed >= state.gibberishAt) {
        buffer[i] = state.scrambled
      } else {
        buffer[i] = "\u00A0"
      }
      }

      const output = buffer.join("")

      let animated: ReactNode = output
      if (isValidElement(children)) {
        animated = cloneElement(children, {}, output)
      }

      setContent(animated)
      rafRef.current = requestAnimationFrame(tick)
    }

    const timeout = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [children, delay, debugMode, shouldStart])

  const renderWithBrackets = (node: ReactNode) => {
    if (!bracket) return node
    return (
      <span className="bracket-interactive px-0.5">
        <span className="bracket-accent font-extralight">[</span>
        <span className="bracket-content">{node}</span>
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
