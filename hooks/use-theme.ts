import { useState, useEffect, useCallback } from "react";

type Theme = "dark" | "light";

export function useTheme() {
  // Read initial theme from a global variable if available (set by a script)
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark"; // Default for SSR
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return savedTheme || (prefersDark ? "dark" : "light");
  });

  useEffect(() => {
    // Apply the theme to the document when the component mounts on the client
    document.documentElement.setAttribute("data-theme", theme);
  }, []); // Run only once on mount

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  }, [theme]);

  return { theme, toggleTheme };
}
