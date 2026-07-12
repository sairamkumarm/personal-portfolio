"use client"

import type { ResumeData } from "@/types/resume"
import { DecodeTextControlledCycle } from "../animation-components/decode-text-controlled-cycle"
import { AnimatedBorder } from "../animation-components/animated-border"

interface JsonProfileProps {
    data: ResumeData
    textPhaseActive: boolean
    interactivePhaseActive: boolean
    DEBUG_MODE: boolean
    calculateDelay: (sectionIndex: number, subIndex?: number, itemIndex?: number) => number
    calculateFieldDelay: (sectionIndex: number, fieldIndex: number) => number
}

export function JsonProfile({ data, textPhaseActive, DEBUG_MODE }: JsonProfileProps) {
    const GlitchComponent = DecodeTextControlledCycle
    // 1. Stringify and split into an array of lines
    const jsonLines = JSON.stringify(data, (key, value) => (key === "renderIndex" ? undefined : value), 2).split("\n");

    return (
        <div className="pt-12 sm:pt-14 pb-2">
            <AnimatedBorder header="RESUME" headerClassName={"text-sm"} className="p-3 flex flex-grow flex-col" delay={0}>
                <pre className="text-theme-muted overflow-x-auto text-xs block">
                    {jsonLines.map((line, index) => (
                        <div key={index} className="whitespace-pre min-h-[1rem] block">
                            <GlitchComponent
                                delay={index * 12}
                                shouldStart={textPhaseActive}
                                debugMode={DEBUG_MODE}
                            >
                                {line}
                            </GlitchComponent>
                        </div>
                    ))}
                </pre>
            </AnimatedBorder>
        </div>
    )
}
