
"use client"

import type React from 'react';
import { AnimatedDivider } from "../animated-divider";
import { SectionPoint } from "../section-point";
import { ResumeData } from "@/types/resume";

interface EducationSectionProps {
    data: ResumeData;
    textPhaseActive: boolean;
    DEBUG_MODE: boolean;
    calculateDelay: (sectionIndex: number, subIndex?: number, itemIndex?: number) => number;
    GlitchComponent: React.ElementType;
}

export function EducationSection({ data, textPhaseActive, DEBUG_MODE, calculateDelay, GlitchComponent }: EducationSectionProps) {
    return (
        <div className="space-y-4">
          <div className="text-base sm:text-lg font-medium tracking-wider">
            <GlitchComponent
              delay={calculateDelay(data.sections.education.renderIndex)}
              shouldStart={textPhaseActive}
              debugMode={DEBUG_MODE}
              className="text-theme-primary"
            >
              <SectionPoint /> EDUCATION
            </GlitchComponent>
          </div>

          {data.sections.education.items.map((edu, index) => (
            <div key={`edu-${index}`} className="space-y-2">
              <div className="text-xs sm:text-sm space-y-1">
                <div>
                  <span className="text-theme-primary">
                    <GlitchComponent
                      delay={calculateDelay(data.sections.education.renderIndex, 1, index * 2)}
                      shouldStart={textPhaseActive}
                      debugMode={DEBUG_MODE}
                      className="text-theme-primary"
                    >
                      {edu.degree}
                    </GlitchComponent>
                  </span>
                </div>
                <div>
                  <span className="text-theme-secondary font-light">
                    <GlitchComponent
                      delay={calculateDelay(data.sections.education.renderIndex, 1, index * 2 + 1)}
                      shouldStart={textPhaseActive}
                      debugMode={DEBUG_MODE}
                      className="text-theme-secondary"
                    >
                      {edu.institution}
                    </GlitchComponent>
                  </span>
                  <span className="text-theme-secondary font-light flex justify-between 1">
                    <GlitchComponent
                      delay={calculateDelay(data.sections.education.renderIndex, 1, index * 2 + 1)}
                      shouldStart={textPhaseActive}
                      debugMode={DEBUG_MODE}
                      className="text-theme-secondary"
                    >
                      {"GRADE: "} {edu.grade}
                    </GlitchComponent>
                    <GlitchComponent
                      delay={calculateDelay(data.sections.education.renderIndex, 1, index * 2 + 1)}
                      shouldStart={textPhaseActive}
                      debugMode={DEBUG_MODE}
                      className="text-theme-secondary"
                    >
                      {edu.duration}
                    </GlitchComponent>
                  </span>
                </div>
              </div>
            </div>
          ))}
          <AnimatedDivider delay={calculateDelay(data.sections.education.renderIndex)} />
        </div>
    )
}
