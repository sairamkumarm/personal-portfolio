
"use client"

import type React from 'react';
import { AnimatedDivider } from "../animated-divider";
import { SectionPoint } from "../section-point";
import { ResumeData } from "@/types/resume";

interface ExperienceSectionProps {
    data: ResumeData;
    textPhaseActive: boolean;
    DEBUG_MODE: boolean;
    calculateDelay: (sectionIndex: number, subIndex?: number, itemIndex?: number) => number;
    GlitchComponent: React.ElementType;
}

export function ExperienceSection({ data, textPhaseActive, DEBUG_MODE, calculateDelay, GlitchComponent }: ExperienceSectionProps) {

    return (
        <div className="space-y-6">
        <div className="text-base sm:text-lg font-medium tracking-wider">
          <GlitchComponent
            delay={calculateDelay(data.sections.experience.renderIndex)}
            shouldStart={textPhaseActive}
            debugMode={DEBUG_MODE}
            className="text-theme-primary"
          >
            <SectionPoint /> EXPERIENCE
          </GlitchComponent>
        </div>

        {data.sections.experience.items.map((exp, index) => (
          <div key={`exp-${index}`} className="space-y-4">
            <div className="text-xs sm:text-sm tracking-wider">
              <GlitchComponent
                delay={calculateDelay(data.sections.experience.renderIndex, 1, index * 10)}
                shouldStart={textPhaseActive}
                debugMode={DEBUG_MODE}
                className="text-theme-primary"
              >
                {exp.org}
              </GlitchComponent>
            </div>
            <div className="text-xs sm:text-sm space-y-1">
              <div className="flex flex-col sm:flex-row sm:gap-4 lg:gap-8">
                <div>
                  <span className="text-theme-primary">
                    <GlitchComponent
                      delay={calculateDelay(data.sections.experience.renderIndex, 1, index * 10 + 1)}
                      shouldStart={textPhaseActive}
                      debugMode={DEBUG_MODE}
                      className="text-theme-primary"
                    >
                      ROLE:{" "}
                    </GlitchComponent>
                  </span>
                  <span className="text-theme-secondary">
                    <GlitchComponent
                      delay={calculateDelay(data.sections.experience.renderIndex, 1, index * 10 + 2)}
                      shouldStart={textPhaseActive}
                      debugMode={DEBUG_MODE}
                      className="text-theme-secondary"
                    >
                      {exp.role}
                    </GlitchComponent>
                  </span>
                </div>
              </div>
              <div>
                <span className="text-theme-primary">
                  <GlitchComponent
                    delay={calculateDelay(data.sections.experience.renderIndex, 1, index * 10 + 3)}
                    shouldStart={textPhaseActive}
                    debugMode={DEBUG_MODE}
                    className="text-theme-primary"
                  >
                    DURATION:{" "}
                  </GlitchComponent>
                </span>
                <span className="text-theme-secondary">
                  <GlitchComponent
                    delay={calculateDelay(data.sections.experience.renderIndex, 1, index * 10 + 4)}
                    shouldStart={textPhaseActive}
                    debugMode={DEBUG_MODE}
                    className="text-theme-secondary"
                  >
                    {exp.duration}
                  </GlitchComponent>
                </span>
              </div>
            </div>

            {/* Experience Description - Enhanced Responsive */}
            <div className="text-xs sm:text-sm leading-relaxed font-light text-theme-secondary tracking-wide space-y-1">
              {exp.description.length === 1 ? (
                // Single item - render as paragraph
                <GlitchComponent
                  delay={calculateDelay(data.sections.experience.renderIndex, 2, index * 10)}
                  shouldStart={textPhaseActive}
                  debugMode={DEBUG_MODE}
                  className="text-theme-secondary"
                >
                  {exp.description[0]}
                </GlitchComponent>
              ) : (
                // Multiple items - render as bullet points
                exp.description.map((point, pointIndex) => (
                  <div key={`exp-${index}-desc-${pointIndex}`} className="flex">
                    <span className="text-theme-primary mr-2 flex-shrink-0">
                      <GlitchComponent
                        delay={calculateDelay(data.sections.experience.renderIndex, 2, index * 10 + pointIndex)}
                        shouldStart={textPhaseActive}
                        debugMode={DEBUG_MODE}
                        className="text-theme-muted"
                      >
                        •
                      </GlitchComponent>
                    </span>
                    <span>
                      <GlitchComponent
                        delay={calculateDelay(data.sections.experience.renderIndex, 2, index * 10 + pointIndex)}
                        shouldStart={textPhaseActive}
                        debugMode={DEBUG_MODE}
                        className="text-theme-muted"
                      >
                        {point}
                      </GlitchComponent>
                    </span>
                  </div>
                ))
              )}
            </div>
            <AnimatedDivider delay={calculateDelay(data.sections.experience.renderIndex, 3, index)} />
          </div>
        ))}
      </div>
    )
}
