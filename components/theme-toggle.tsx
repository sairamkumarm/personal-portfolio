"use client"

import { useTheme } from "@/hooks/use-theme"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`px-1 text-sm ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >            
    <span className="bracket-interactive px-0.5">
      <span className="bracket-accent">[</span>
      <span className="bracket-content">{theme === "dark" ? "LIGHT" : "DARK"}</span>
      <span className="bracket-accent">]</span>
    </span>
     
    </button>
  )
}
