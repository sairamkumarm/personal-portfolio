
"use client"

import { useState, useEffect, useMemo } from "react"
import type { ResumeData } from "@/types/resume"
import { RenderSequence } from "./render-sequence"
import { toSentenceCase } from "@/lib/text-helpers"
import { ProfileHeader } from "./profile/profile-header"
import { IdentityPanel } from "./profile/identity-panel"
import { ProjectsSection } from "./profile/project-section"
import { ExperienceSection } from "./profile/experience-section"
import { DecodeTextNonCycled } from "./decode-text-non-cycled"

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

  const GlitchComponent = DecodeTextNonCycled;

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
      className={`min-h-screen bg-theme-primary text-theme-primary font-mono ${interactivePhaseActive ? "interactive-phase" : "non-interactive-phase"}`}>
      {/* Debug Mode Indicator */}
      {DEBUG_MODE && <div className="fixed top-2 right-2 z-50 bg-red-600 text-white px-2 py-1 text-sm">DEBUG MODE</div>}

      <ProfileHeader data={data} textPhaseActive={textPhaseActive} interactivePhaseActive={interactivePhaseActive} DEBUG_MODE={DEBUG_MODE} GlitchComponent={GlitchComponent} />

      {/* Main Content - Enhanced Responsive Grid */}
      <div className="pt-16 sm:pt-20 lg:pt-16 grid grid-cols-1 lg:grid-cols-2 min-h-screen z-0">
        {/* Left Pane - Identity Panel */}
        <div className="">
          <div className="relative">
            <RenderSequence phase="lines" delay={DEBUG_MODE ? 0 : 400}>
              <div className="absolute right-0 top-0 w-px h-full hidden lg:block">
                <div className="border-r border-theme-secondary border-build"></div>
              </div>
            </RenderSequence>
            <IdentityPanel data={data} textPhaseActive={textPhaseActive} DEBUG_MODE={DEBUG_MODE} calculateDelay={calculateDelay} calculateFieldDelay={calculateFieldDelay} GlitchComponent={GlitchComponent} />
          </div>
        </div>

        {/* Right Pane - Projects & Dynamic Content - Enhanced Responsive */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
          <ProjectsSection data={data} textPhaseActive={textPhaseActive} DEBUG_MODE={DEBUG_MODE} calculateDelay={calculateDelay} GlitchComponent={GlitchComponent} />
          <ExperienceSection data={data} textPhaseActive={textPhaseActive} DEBUG_MODE={DEBUG_MODE} calculateDelay={calculateDelay} GlitchComponent={GlitchComponent} />
        </div>
      </div>

      {/* Footer - Enhanced Responsive */}
      <RenderSequence phase="interactive" delay={DEBUG_MODE ? 0 : 4500}>
        <footer className="p-4 text-center text-xs sm:text-sm tracking-wider">
          <div className="border-t border-theme-primary border-build" style={{ animationDelay: "0s" }}>
            <div className="py-4">
              <span className="block sm:inline bracket-interactive"><span className="bracket-accent">[</span>BUILT BY SAIRAMKUMAR M<span className="bracket-accent">]</span></span>
              <span className="hidden sm:inline"> ⁝⁝⁝ </span>
              <span className="block sm:inline bracket-interactive"><span className="bracket-accent">[</span>NO COOKIES | NO TRACKERS<span className="bracket-accent">]</span></span>
            </div>
          </div>
        </footer>
      </RenderSequence>
    </div>
  )
}
