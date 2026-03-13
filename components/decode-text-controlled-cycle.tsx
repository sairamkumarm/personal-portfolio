"use client"

import {
  useState,
  useEffect,
  useRef,
  ReactNode,
  Children,
  isValidElement,
  useMemo,
  useCallback,
  cloneElement,
} from "react"

const CHARS = "&%$#@ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ                 "

const GIBBERISH_SWEEP_MS = 400
const REVEAL_LAG_MS = 1600

const CYCLE_INTERVAL = 1000
const CYCLE_DELTA = 100

const DEFAULT_IMMUTABLE_CHARS = new Set([
  " ", ".", ":", ";", ",", "!", "?", "'", '"', "`", "-", "_",
  "(", ")", "[", "]", "{", "}", "/", "\\",
  "@", "•", "⫻", "—", "⁝", "›", "&",
])

interface CharState {
  original: string
  scrambled: string
  gibberishAt: number
  revealAt: number
  nextCycleAt: number
}

const getPlainText = (children: ReactNode): string => {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return child
      if (isValidElement<{ children?: ReactNode }>(child) && child.props.children) {
        return getPlainText(child.props.children)
      }
      return ""
    })
    .join("")
}

const getScrambleChar = (
  char: string,
  scramblePool: string,
  immutableChars: Set<string> = DEFAULT_IMMUTABLE_CHARS
): string => {
  if (immutableChars.has(char)) return char
  return scramblePool[Math.floor(Math.random() * scramblePool.length)]
}

const randomCycle = (interval: number, delta: number) => {
  const min = Math.max(0, interval - delta)
  const max = interval + delta
  return min + Math.random() * (max - min)
}

interface DecodeTextControlledCycleProps {
  children: ReactNode
  delay?: number
  className?: string
  shouldStart?: boolean
  debugMode?: boolean
  bracket?: boolean
  cycleInterval?: number
}

export function DecodeTextControlledCycle({
  children,
  delay = 0,
  className = "",
  shouldStart = true,
  debugMode = false,
  bracket = false,
  cycleInterval = CYCLE_INTERVAL,
}: DecodeTextControlledCycleProps) {
  const [content, setContent] = useState<ReactNode | null>(null)
  const hasCompletedRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  
  const planRef = useRef<CharState[]>([])
  const totalDurationRef = useRef(0)
  const bufferRef = useRef<string[]>([]);

  const plainText = useMemo(() => getPlainText(children), [children])

  useEffect(() => {
    hasCompletedRef.current = false
    startTimeRef.current = null
    setContent(null)

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    if (!plainText.length) {
      planRef.current = []
      totalDurationRef.current = 0
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
        nextCycleAt: gibberishAt + randomCycle(cycleInterval, CYCLE_DELTA),
      }
    })

    planRef.current = plan
    bufferRef.current = new Array(plan.length).fill("\u00A0")
    totalDurationRef.current = plan[plan.length - 1].revealAt
    
  }, [plainText, cycleInterval])

  const tick = useCallback((now: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = now
    }

    const elapsed = now - startTimeRef.current
    const plan = planRef.current
    const buffer = bufferRef.current
    const totalDuration = totalDurationRef.current

    if (elapsed >= totalDuration) {
      hasCompletedRef.current = true
      setContent(children)
      return
    }

    const wavePosition = (elapsed / totalDuration) * plan.length

    for (let i = 0; i < plan.length; i++) {
      const state = plan[i]

      if (elapsed >= state.revealAt) {
        buffer[i] = state.original
      } else if (elapsed >= state.gibberishAt) {
        if (DEFAULT_IMMUTABLE_CHARS.has(state.original)) {
            buffer[i] = state.original;
        } else {
            const progress =
            (elapsed - state.gibberishAt) /
            (state.revealAt - state.gibberishAt)
    
            const base = 1 - progress
            const distanceFactor = Math.min(1, Math.abs(i - wavePosition) / 6)
    
            const scrambleProbability = Math.max(0.15, base * distanceFactor)
    
            if (elapsed >= state.nextCycleAt && Math.random() < scrambleProbability) {
              state.scrambled = getScrambleChar(state.original, CHARS)
              state.nextCycleAt = elapsed + randomCycle(cycleInterval, CYCLE_DELTA)
            }
            buffer[i] = state.scrambled
        }
      } else {
        buffer[i] = "\u00A0"
      }
    }

    const output = buffer.join("")
    let animatedNode: ReactNode = output;
    if (isValidElement(children)) {
        animatedNode = cloneElement(children, {}, output);
    }
    setContent(animatedNode);

    rafRef.current = requestAnimationFrame(tick)
  }, [children, cycleInterval])

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

    const timeout = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [children, delay, debugMode, shouldStart, tick])

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
