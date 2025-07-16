import { RenderSequence } from "./render-sequence"

interface AnimatedDividerProps {
  delay?: number
  className?: string
  type?: "horizontal" | "vertical"
}

export function AnimatedDivider({ delay = 0, className = "", type = "horizontal" }: AnimatedDividerProps) {
  if (type === "vertical") {
    return (
      <RenderSequence phase="lines" delay={delay} className={className}>
        <div className="border-r border-theme-secondary vertical-line-build h-full"></div>
      </RenderSequence>
    )
  }

  return (
    <RenderSequence phase="lines" delay={delay} className={className}>
      <div className="border-t border-theme-secondary border-build"></div>
    </RenderSequence>
  )
}
