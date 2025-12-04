
"use client"

import type React from 'react';
import { AnimatedDivider } from "../animated-divider";
import { SectionPoint } from "../section-point";
import { ResumeData } from "@/types/resume";

interface ProjectsSectionProps {
    data: ResumeData;
    textPhaseActive: boolean;
    DEBUG_MODE: boolean;
    calculateDelay: (sectionIndex: number, subIndex?: number, itemIndex?: number) => number;
    GlitchComponent: React.ElementType;
}

export function ProjectsSection({ data, textPhaseActive, DEBUG_MODE, calculateDelay, GlitchComponent }: ProjectsSectionProps) {

    return (
        <div className="space-y-6">
        <div className="text-base font-medium sm:text-lg tracking-wider">
          <GlitchComponent
            delay={calculateDelay(data.sections.projects.renderIndex)}
            shouldStart={textPhaseActive}
            debugMode={DEBUG_MODE}
            className="text-theme-primary"
          >
            <SectionPoint /> PROJECTS
          </GlitchComponent>
        </div>

        {data.sections.projects.items.map((project, index) => (
          <div key={`project-${index}`} className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-2 lg:gap-4">
              <div className="text-xs sm:text-sm tracking-wider flex-1">
                <GlitchComponent
                  delay={calculateDelay(data.sections.projects.renderIndex, 1, index * 15)}
                  shouldStart={textPhaseActive}
                  debugMode={DEBUG_MODE}
                  className="text-theme-primary"
                >
                  {project.name} — {project.headline}
                </GlitchComponent>
              </div>
              <div className="text-xs sm:text-sm">
                <div className="flex gap-1 sm:gap-2 flex-wrap">
                  {project.links.map((link, linkIndex) => (
                    <a 
                    key={`project-${index}-link-${linkIndex}`} 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer">
                      <GlitchComponent
                        bracket
                        delay={calculateDelay(data.sections.projects.renderIndex, 1, index * 15 + linkIndex + 1)}
                        shouldStart={textPhaseActive}
                        debugMode={DEBUG_MODE}
                        className=""
                      >
                        {link.label}
                      </GlitchComponent>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="flex flex-wrap font-normal gap-1">
                {project.stack.map((tech, techIndex) => (
                  <span key={`project-${index}-tech-${techIndex}`}>
                    <GlitchComponent
                      bracket
                      delay={calculateDelay(data.sections.projects.renderIndex, 1, index * 15 + techIndex + 3)}
                      shouldStart={textPhaseActive}
                      debugMode={DEBUG_MODE}
                      className="text-theme-secondary"
                    >
                      {tech}
                    </GlitchComponent>
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2 text-xs sm:text-sm">
              {/* Project Description - Enhanced Responsive */}
              <div className="leading-relaxed text-theme-muted font-light tracking-wide space-y-1">
                {project.description.length === 1 ? (
                  // Single item - render as paragraph
                  <GlitchComponent
                    delay={calculateDelay(data.sections.projects.renderIndex, 2, index * 15)}
                    shouldStart={textPhaseActive}
                    debugMode={DEBUG_MODE}
                    className="text-theme-muted"
                  >
                    {project.description[0]}
                  </GlitchComponent>
                ) : (
                  // Multiple items - render as bullet points
                  project.description.map((point, pointIndex) => (
                    <div key={`exp-${index}-desc-${pointIndex}`} className="flex">
                    <span className="text-theme-primary mr-2 flex-shrink-0">
                      <GlitchComponent
                        delay={calculateDelay(data.sections.projects.renderIndex, 2, index * 10 + pointIndex)}
                        shouldStart={textPhaseActive}
                        debugMode={DEBUG_MODE}
                        className="text-theme-muted"
                      >
                        •
                      </GlitchComponent>
                    </span>
                    <span>
                      <GlitchComponent
                        delay={calculateDelay(data.sections.projects.renderIndex, 2, index * 10 + pointIndex)}
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
            </div>
            <AnimatedDivider delay={calculateDelay(data.sections.projects.renderIndex, 3, index)} />
          </div>
        ))}
      </div>
    )
}
