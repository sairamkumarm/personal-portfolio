
"use client"

import type { ResumeData } from "@/types/resume"
import { ProjectsSection } from "./project-section"
import { ExperienceSection } from "./experience-section"
import { DecodeTextControlledCycle } from "../../animation-components/decode-text-controlled-cycle"
import { PersonalInfoSection } from "./personal-info-section"
import { SkillsSection } from "./skills-section"
import { EducationSection } from "./education-section"

interface RenderedProfileProps {
  data: ResumeData
  textPhaseActive: boolean
  interactivePhaseActive: boolean
  DEBUG_MODE: boolean
  calculateDelay: (sectionIndex: number, subIndex?: number, itemIndex?: number) => number
  calculateFieldDelay: (sectionIndex: number, fieldIndex: number) => number
}

export function RenderedProfile({ data, textPhaseActive, interactivePhaseActive, DEBUG_MODE, calculateDelay, calculateFieldDelay }: RenderedProfileProps) {
  const GlitchComponent = DecodeTextControlledCycle

  return (
    <div className={`flex flex-grow flex-col p-0 font-mono ${interactivePhaseActive ? "interactive-phase" : "non-interactive-phase"}`}>
      {/* Debug Mode Indicator */}
      {DEBUG_MODE && <div className="fixed top-2 right-2 z-50 bg-red-600 text-white px-2 py-1 text-sm">DEBUG MODE</div>}

      {/* Main Content - Multi-column Layout */}
      <div className="flex-1 pt-12 sm:pt-14 columns-[30rem] pb-4 gap-x-4 space-y-4 px-0 z-60">
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
    </div>
  )
}
