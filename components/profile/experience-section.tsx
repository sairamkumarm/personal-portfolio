
"use client"

import type React from 'react';
import { AnimatedBorder } from "../animated-border";
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
        <AnimatedBorder header="EXPERIENCE" delay={calculateDelay(data.sections.experience.renderIndex)} >
            <div className="space-y-4 pt-2">
                {data.sections.experience.items.map((exp, index) => (
                    <AnimatedBorder
                        key={`exp-${index}`}
                        header={exp.org}
                        delay={calculateDelay(data.sections.experience.renderIndex, 1, index * 10)}
                        GlitchComponent={GlitchComponent}
                        headerClassName='text-xs sm:text-sm text-theme-primary'
                        borderClassName='border-theme-tertiary'
                    >
                        <div key={`exp-${index}`} className="space-y-2">
                            <div className="text-xs sm:text-sm space-y-1">
                                <div className="flex flex-row justify-between sm:gap-4 lg:gap-8">
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
                        </div>
                    </AnimatedBorder>
                ))}
            </div>
        </AnimatedBorder>
    )
}
