
"use client"

import type React from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { RenderSequence } from "./animation-components/render-sequence";
import { ThemeToggle } from "./theme-toggle";
import { ViewToggle } from "./view-toggle";
import { ResumeData } from "@/types/resume";
import { AnimatedBorder } from './animation-components/animated-border';
import { resolveContentKey, VIEW_OPTIONS, type ContentKey } from '@/types/types';

interface ProfileHeaderProps {
  data: ResumeData;
  textPhaseActive: boolean;
  interactivePhaseActive: boolean;
  DEBUG_MODE: boolean;
  GlitchComponent: React.ElementType;
}

export function ProfileHeader({ data, textPhaseActive, interactivePhaseActive, DEBUG_MODE, GlitchComponent }: ProfileHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentView = resolveContentKey(searchParams.get("view"));
  const viewOptions = VIEW_OPTIONS;

  const handleViewChange = (nextView: ContentKey) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", nextView);
    router.push(`/?${params.toString()}`);
  };

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
                <GlitchComponent delay={0} debugMode={true} className="" shouldStart={textPhaseActive}>
                  {" "}
                  <span className="text-theme-accent" style={{ fontFamily: "SF Mono, Monaco, Consolas, monospace" }}>
                    ⁝⁝⁝
                  </span>{" "}
                </GlitchComponent>
                  <GlitchComponent delay={0} shouldStart={textPhaseActive} debugMode={DEBUG_MODE}>
                    <ViewToggle
                      currentValue={currentView}
                      options={viewOptions}
                      onChange={handleViewChange}
                    />
                  </GlitchComponent>
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
                <div className="sm:hidden">
                  <GlitchComponent delay={0} shouldStart={textPhaseActive} debugMode={DEBUG_MODE}>
                    <ViewToggle
                      currentValue={currentView}
                      options={viewOptions}
                      onChange={handleViewChange}
                    />
                  </GlitchComponent>
                </div>
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
