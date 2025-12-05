
"use client"

import type React from 'react';
import { RenderSequence } from "../render-sequence";
import { ThemeToggle } from "../theme-toggle";
import { ResumeData } from "@/types/resume";

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
        <nav className="fixed top-0 left-0 right-0 z-[9999] bg-theme-primary px-3 sm:px-4 lg:px-6 py-2">
          <div
            className="border-t border-b border-theme-primary border-build"
            style={{ animationDelay: DEBUG_MODE ? "0s" : "0.2s" }}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm py-2 gap-2 sm:gap-4">
              {/* Left side - Title with backdrop blur */}
              <div className="tracking-wider backdrop-blur-md bg-theme-secondary pr-1 w-fit flex gap-1 items-center">
                <GlitchComponent bracket delay={0} shouldStart={textPhaseActive} debugMode={DEBUG_MODE} className="uppercase">
                  {data.personal_info.name}
                </GlitchComponent>
                <span className="text-theme-secondary">
                  <GlitchComponent delay={0} className="" shouldStart={textPhaseActive} debugMode={DEBUG_MODE}>
                    <b className="text-theme-accent" style={{ fontFamily: "SF Mono, Monaco, Consolas, monospace" }}>
                      {" "}
                      ⁝⁝⁝
                    </b>{" "}
                    <span>PROFILE</span>
                  </GlitchComponent>
                </span>
              </div>

              {/* Right side - Actions with backdrop blur */}
              <div className="flex gap-2 sm:gap-4 items-center flex-wrap">
                <RenderSequence phase="interactive" delay={DEBUG_MODE ? 0 : 6200}>
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
                </RenderSequence>
                <RenderSequence phase="interactive" delay={DEBUG_MODE ? 0 : 6400}>
                <a href="mailto:sairamkumar.m@outlook.com" 
                  target="_blank"
                  rel="noopener noreferrer">
                  <GlitchComponent bracket delay={0} shouldStart={textPhaseActive} debugMode={DEBUG_MODE}>
                    CONTACT
                  </GlitchComponent>
                  </a>
                </RenderSequence>
                <RenderSequence phase="interactive" delay={DEBUG_MODE ? 0 : 6600}>
                  <ThemeToggle />
                </RenderSequence>
              </div>
            </div>
          </div>
        </nav>
      </RenderSequence>
    )
}
