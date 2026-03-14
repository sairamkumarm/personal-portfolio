"use client"

import type React from 'react';
import { useState, useEffect } from 'react';
import { RenderSequence } from "./render-sequence";
import { GlitchText } from './glitch-text';

interface AnimatedBorderProps {
  children: React.ReactNode;
  header?: string;
  delay?: number;
  className?: string;
  headerClassName?: string;
  GlitchComponent?: React.ElementType;
  borderClassName?: string;
}

export function AnimatedBorder({ children, header, delay = 0, className = "p-4", headerClassName = "font-medium", GlitchComponent = GlitchText, borderClassName = "border-theme-secondary" }: AnimatedBorderProps) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerDelay = (delay || 0) + 1000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeaderVisible(true);
    }, headerDelay);

    return () => clearTimeout(timer);
  }, [headerDelay]);

  return (
    <div className={`relative ${className}`}>
        <RenderSequence phase="lines" delay={delay}>
            <div className={`absolute inset-0 pointer-events-none`}>
                <div className={`absolute top-0 left-0 w-full border-t border-build ${borderClassName}`} style={{ animationDelay: `${delay}ms`, transformOrigin: 'left' }}/>
                <div className={`absolute top-0 right-0 h-full border-r vertical-line-build ${borderClassName}`} style={{ animationDelay: `${delay + 250}ms`, transformOrigin: 'top' }}/>
                <div className={`absolute bottom-0 right-0 w-full border-b border-build ${borderClassName}`} style={{ animationDelay: `${delay + 500}ms`, transformOrigin: 'right' }}/>
                <div className={`absolute bottom-0 left-0 h-full border-l vertical-line-build ${borderClassName}`} style={{ animationDelay: `${delay + 750}ms`, transformOrigin: 'bottom' }}/>
            </div>
        </RenderSequence>
        
        {header && isHeaderVisible && (
            <div className={`absolute left-2 top-0 -translate-y-1/2 z-20 bg-theme-primary px-2 render-delay-1 ${headerClassName}`}>
              <GlitchComponent>
                <h2 className=" tracking-wider uppercase text-md">{header}</h2>
              </GlitchComponent>
            </div>
        )}

        <div className="relative z-0">
            {children}
        </div>
    </div>
  );
}
