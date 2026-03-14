
"use client"

import type React from 'react';
import { AnimatedBorder } from "../animated-border";
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
        <AnimatedBorder header="EDUCATION" delay={calculateDelay(data.sections.education.renderIndex)}>
            <div className="space-y-4">
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
            </div>
        </AnimatedBorder>
    )
}
