
"use client"

import type React from 'react';
import { AnimatedBorder } from "../animated-border";
import { ResumeData } from "@/types/resume";

interface SkillsSectionProps {
    data: ResumeData;
    textPhaseActive: boolean;
    DEBUG_MODE: boolean;
    calculateDelay: (sectionIndex: number, subIndex?: number, itemIndex?: number) => number;
    GlitchComponent: React.ElementType;
}

export function SkillsSection({ data, textPhaseActive, DEBUG_MODE, calculateDelay, GlitchComponent }: SkillsSectionProps) {
    return (
        <AnimatedBorder header="STACK" delay={calculateDelay(data.skills.renderIndex)} >
            <div className="space-y-4">
                <div className="space-y-3 text-xs sm:text-sm">
                    {data.skills.categories.map((category, categoryIndex) => (
                        <div key={`category-${categoryIndex}`} className="space-y-1 lg:space-y-2">
                            <div className="text-theme-primary">
                                <GlitchComponent
                                    delay={calculateDelay(data.skills.renderIndex, 2, categoryIndex * 10)}
                                    shouldStart={textPhaseActive}
                                    debugMode={DEBUG_MODE}
                                    className=""
                                >
                                    {"›"} {category.name}
                                </GlitchComponent>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {category.skills.map((skill, skillIndex) => (
                                    <span key={`skill-${categoryIndex}-${skillIndex}`}>
                                        <GlitchComponent
                                            bracket
                                            delay={calculateDelay(data.skills.renderIndex, 2, categoryIndex * 10 + skillIndex + 1)}
                                            shouldStart={textPhaseActive}
                                            debugMode={DEBUG_MODE}
                                            className=" text-xs sm:text-sm text-theme-secondary"
                                        >
                                            {skill}
                                        </GlitchComponent>
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedBorder>
    )
}
