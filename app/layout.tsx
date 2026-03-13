import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sairamkumar M - Backend Engineer",
  description: "Backend Engineer specializing in distributed systems and microservice architectures",
  icons: {
    icon: '/icon.svg',
  },
}

const ThemeInit = () => {
    const script = `
      (function() {
        function getInitialTheme() {
          const persistedTheme = window.localStorage.getItem('theme');
          if (persistedTheme) {
            return persistedTheme;
          }
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          return systemTheme;
        }
        const theme = getInitialTheme();
        document.documentElement.setAttribute('data-theme', theme);
      })();
    `;
  
    return (
      <script dangerouslySetInnerHTML={{ __html: script }} />
    );
  };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-lt-installed="true" suppressHydrationWarning>
      <head>
        <ThemeInit />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
