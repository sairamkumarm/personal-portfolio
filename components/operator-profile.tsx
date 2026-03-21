
"use client"

import { useState, useEffect, useMemo } from "react"
import type { ResumeData } from "@/types/resume"
import { RenderSequence } from "./render-sequence"
import { ProfileHeader } from "./profile/profile-header"
import { ProjectsSection } from "./profile/project-section"
import { ExperienceSection } from "./profile/experience-section"
import { DecodeTextControlledCycle } from "./decode-text-controlled-cycle"
import { PersonalInfoSection } from "./profile/personal-info-section"
import { SkillsSection } from "./profile/skills-section"
import { EducationSection } from "./profile/education-section"
import { AnimatedBorder } from "./animated-border"

interface OperatorProfileProps {
  data: ResumeData
}

// 🚨 DEBUG MODE - Set to true to disable all animations
const DEBUG_MODE = false

// FIXED: Centralized delay calculation system with stable values
const SECTION_BASE_DELAY = 300
const SUBSECTION_DELAY = 150
const ITEM_DELAY = 50
const FIELD_DELAY = 150

// FIXED: Memoized delay calculation functions
const calculateDelay = (sectionIndex: number, subIndex = 0, itemIndex = 0): number => {
  if (DEBUG_MODE) return 0
  return sectionIndex * SECTION_BASE_DELAY + subIndex * SUBSECTION_DELAY + itemIndex * ITEM_DELAY
}

const calculateFieldDelay = (sectionIndex: number, fieldIndex: number): number => {
  if (DEBUG_MODE) return 0
  return sectionIndex * SECTION_BASE_DELAY + fieldIndex * FIELD_DELAY
}

export function OperatorProfile({ data }: OperatorProfileProps) {
  const [currentPhase, setCurrentPhase] = useState<"lines" | "text" | "interactive">(
    DEBUG_MODE ? "interactive" : "lines",
  )

  const GlitchComponent = DecodeTextControlledCycle;

  // FIXED: Stable phase management
  useEffect(() => {
    if (DEBUG_MODE) {
      setCurrentPhase("interactive")
      return
    }

    let linesTimer: NodeJS.Timeout
    let textTimer: NodeJS.Timeout

    // Phase 1: Lines and dividers (0-2s)
    linesTimer = setTimeout(() => {
      setCurrentPhase("text")
    }, 2000)

    // Phase 2: Text content (2-6s)
    textTimer = setTimeout(() => {
      setCurrentPhase("interactive")
    }, 6000)

    return () => {
      clearTimeout(linesTimer)
      clearTimeout(textTimer)
    }
  }, []) // FIXED: Empty dependency array to prevent re-runs

  // FIXED: Memoized phase calculations
  const textPhaseActive = useMemo(() => {
    return DEBUG_MODE || currentPhase === "text" || currentPhase === "interactive"
  }, [currentPhase])

  const interactivePhaseActive = useMemo(() => {
    return DEBUG_MODE || currentPhase === "interactive"
  }, [currentPhase])

  return (
    <div
      className={`min-h-screen flex flex-col p-1 font-mono ${interactivePhaseActive ? "interactive-phase" : "non-interactive-phase"}`}>
      {/* Debug Mode Indicator */}
      {DEBUG_MODE && <div className="fixed top-2 right-2 z-50 bg-red-600 text-white px-2 py-1 text-sm">DEBUG MODE</div>}

      <ProfileHeader data={data} textPhaseActive={textPhaseActive} interactivePhaseActive={interactivePhaseActive} DEBUG_MODE={DEBUG_MODE} GlitchComponent={GlitchComponent} />

      {/* Main Content - Multi-column Layout */}
      <div className="flex-1 pt-20 sm:pt-14 columns-[30rem] pb-4 gap-x-4 space-y-4 px-0 z-60">
        <div className=" break-inside-avoid bg-theme-primary">
          <PersonalInfoSection data={data} textPhaseActive={textPhaseActive} DEBUG_MODE={DEBUG_MODE} calculateDelay={calculateDelay} calculateFieldDelay={calculateFieldDelay} GlitchComponent={GlitchComponent} />
        </div>

        <div className=" break-inside-avoid bg-theme-primary">
          <SkillsSection data={data} textPhaseActive={textPhaseActive} DEBUG_MODE={DEBUG_MODE} calculateDelay={calculateDelay} GlitchComponent={GlitchComponent} />
        </div>
        
        <div className=" break-inside-avoid bg-theme-primary">
          <EducationSection data={data} textPhaseActive={textPhaseActive} DEBUG_MODE={DEBUG_MODE} calculateDelay={calculateDelay} GlitchComponent={GlitchComponent} />
        </div>
        
        <div className=" break-inside-avoid bg-theme-primary">
          <ProjectsSection data={data} textPhaseActive={textPhaseActive} DEBUG_MODE={DEBUG_MODE} calculateDelay={calculateDelay} GlitchComponent={GlitchComponent} />
        </div>

        <div className=" break-inside-avoid bg-theme-primary">
          <ExperienceSection data={data} textPhaseActive={textPhaseActive} DEBUG_MODE={DEBUG_MODE} calculateDelay={calculateDelay} GlitchComponent={GlitchComponent} />
        </div>
      </div>

      {/* Footer - Enhanced Responsive */}
      <RenderSequence phase="interactive" delay={DEBUG_MODE ? 0 : 4500}>
        <footer className="text-center text-xs sm:text-sm tracking-wider bg-theme-primary">
          <AnimatedBorder className="p-2">
            <div className="py-0">
            <span className="block sm:inline bracket-interactive"><span className="bracket-accent">[</span>BUILT WITH <span className="line-through">SPITE</span> LOVE<span className="bracket-accent">]</span></span>
            <span className="hidden sm:inline text-theme-accent" style={{ fontFamily: "SF Mono, Monaco, Consolas, monospace" }}> ⁝⁝⁝ </span>
              <span className="block sm:inline bracket-interactive"><span className="bracket-accent">[</span>© 2026 SAIRAMKUMAR M<span className="bracket-accent">]</span></span>
              <span className="hidden sm:inline text-theme-accent" style={{ fontFamily: "SF Mono, Monaco, Consolas, monospace" }}> ⁝⁝⁝ </span>
              <span className="block sm:inline bracket-interactive"><span className="bracket-accent">[</span><span className="line-through">PRECISION</span> OCD ENGINEERED<span className="bracket-accent">]</span></span>
            </div>
          </AnimatedBorder>
        </footer>
      </RenderSequence>
    </div>
  )
}
