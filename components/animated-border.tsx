"use client"

import type React from 'react';
import { useState, useEffect } from 'react';
import { RenderSequence } from "./render-sequence";

interface AnimatedBorderProps {
  children: React.ReactNode;
  header?: string;
  delay?: number;
  className?: string;
  headerClassName?: string;
}

export function AnimatedBorder({ children, header, delay = 0, className = "", headerClassName = "" }: AnimatedBorderProps) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerDelay = (delay || 0) + 1000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeaderVisible(true);
    }, headerDelay);

    return () => clearTimeout(timer);
  }, [headerDelay]);

  return (
    <div className={`relative p-4 ${className}`}>
        <RenderSequence phase="lines" delay={delay}>
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full border-t border-theme-secondary border-build" style={{ animationDelay: `${delay}ms`, transformOrigin: 'left' }}/>
                <div className="absolute top-0 right-0 h-full border-r border-theme-secondary vertical-line-build" style={{ animationDelay: `${delay + 250}ms`, transformOrigin: 'top' }}/>
                <div className="absolute bottom-0 right-0 w-full border-b border-theme-secondary border-build" style={{ animationDelay: `${delay + 500}ms`, transformOrigin: 'right' }}/>
                <div className="absolute bottom-0 left-0 h-full border-l border-theme-secondary vertical-line-build" style={{ animationDelay: `${delay + 750}ms`, transformOrigin: 'bottom' }}/>
            </div>
        </RenderSequence>
        
        {header && isHeaderVisible && (
            <div className={`absolute left-4 top-0 -translate-y-1/2 z-20 bg-theme-primary px-2 render-delay-1 ${headerClassName}`}>
              <h2 className="font-bold tracking-wider uppercase text-md">{header}</h2>
            </div>
        )}

        <div className="relative z-0">
            {children}
        </div>
    </div>
  );
}
