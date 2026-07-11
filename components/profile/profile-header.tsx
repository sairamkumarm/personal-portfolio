
"use client"

import type React from 'react';
import { RenderSequence } from "../render-sequence";
import { ThemeToggle } from "../theme-toggle";
import { ResumeData } from "@/types/resume";
import { AnimatedBorder } from '../animated-border';

interface ProfileHeaderProps {
    data: ResumeData;
    textPhaseActive: boolean;
    interactivePhaseActive: boolean;
    DEBUG_MODE: boolean;
    GlitchComponent: React.ElementType;
}

export function ProfileHeader({ data, textPhaseActive, interactivePhaseActive, DEBUG_MODE, GlitchComponent }: ProfileHeaderProps) {

    return (
        <RenderSequence phase="lines" delay={DEBUG_MODE ? 0 : 0}>
        <nav className="fixed top-1 left-1 right-1 z-[9999] bg-theme-primary px-0 py-0">
          <AnimatedBorder className='p-2' borderClassName='border-theme-primary'>
          <div>
            <div className="flex justify-center sm:justify-between items-center text-xs sm:text-sm py-0 gap-2 sm:gap-4 sm:pr-0.5">
              {/* Left side - Title with backdrop blur */}
              <div className="backdrop-blur-md bg-theme-secondary pr-1 w-fit hidden sm:flex gap-1 items-center ">
                <GlitchComponent bracket delay={0} shouldStart={textPhaseActive} debugMode={DEBUG_MODE} className="uppercase">
                  {data.personal_info.name}
                </GlitchComponent>
                <span >
                  <GlitchComponent delay={0} className="" shouldStart={textPhaseActive} debugMode={DEBUG_MODE}>
                    {" "}
                    <span className="text-theme-accent" style={{ fontFamily: "SF Mono, Monaco, Consolas, monospace" }}>
                      ⁝⁝⁝
                    </span>{" "}
                    <span className="text-theme-secondary">PROFILE</span>
                  </GlitchComponent>
                </span>
              </div>

              {/* Right side - Actions with backdrop blur */}
              <div className="flex w-full justify-between sm:w-auto sm:gap-2 items-center">
                <a
                  href={process.env.NEXT_PUBLIC_RESUME_STATIC_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="resume-link"
                >
                  <GlitchComponent bracket delay={0} shouldStart={textPhaseActive} debugMode={DEBUG_MODE}>
                    RESUME.PDF
                  </GlitchComponent>
                  </a>
                <a href="mailto:sairamkumar.m@outlook.com" 
                  target="_blank"
                  rel="noopener noreferrer">
                  <GlitchComponent bracket delay={0} shouldStart={textPhaseActive} debugMode={DEBUG_MODE}>
                    EMAIL
                  </GlitchComponent>
                  </a>
                  <GlitchComponent delay={0} shouldStart={textPhaseActive} debugMode={DEBUG_MODE}>
                    <ThemeToggle />
                  </GlitchComponent>
              </div>
            </div>
          </div>
          </AnimatedBorder>

        </nav>
      </RenderSequence>
    )
}
