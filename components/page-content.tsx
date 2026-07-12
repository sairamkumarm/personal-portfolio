"use client"

import { useState, useEffect, useMemo } from "react"
import type { ResumeData } from "@/types/resume"
import { ProfileHeader } from "./profile-header"
import { ProfileContent } from "./profile-content"
import { DecodeTextControlledCycle } from "./animation-components/decode-text-controlled-cycle"
import { ProfileFooter } from "./profile-footer"
import { ContentKey } from "@/types/types"

interface PageContentProps {
    data: ResumeData
    contentKey?: ContentKey
}

// DEBUG MODE toggle
const DEBUG_MODE = false

// Delay constants
const SECTION_BASE_DELAY = 100
const SUBSECTION_DELAY = 50
const ITEM_DELAY = 40
const FIELD_DELAY = 30

const calculateDelay = (sectionIndex: number, subIndex = 0, itemIndex = 0): number => {
    if (DEBUG_MODE) return 0
    return sectionIndex * SECTION_BASE_DELAY + subIndex * SUBSECTION_DELAY + itemIndex * ITEM_DELAY
}

const calculateFieldDelay = (sectionIndex: number, fieldIndex: number): number => {
    if (DEBUG_MODE) return 0
    return sectionIndex * SECTION_BASE_DELAY + fieldIndex * FIELD_DELAY
}


export function PageContent({ data, contentKey = "profile" }: PageContentProps) {
    const [currentPhase, setCurrentPhase] = useState<"lines" | "text" | "interactive">(DEBUG_MODE ? "interactive" : "lines")

    const GlitchComponent = DecodeTextControlledCycle

    useEffect(() => {
        if (DEBUG_MODE) {
            setCurrentPhase("interactive")
            return
        }

        let linesTimer: NodeJS.Timeout
        let textTimer: NodeJS.Timeout

        linesTimer = setTimeout(() => setCurrentPhase("text"), 2000)
        textTimer = setTimeout(() => setCurrentPhase("interactive"), 6000)

        return () => {
            clearTimeout(linesTimer)
            clearTimeout(textTimer)
        }
    }, [])

    const textPhaseActive = useMemo(() => DEBUG_MODE || currentPhase === "text" || currentPhase === "interactive", [currentPhase])
    const interactivePhaseActive = useMemo(() => DEBUG_MODE || currentPhase === "interactive", [currentPhase])

    return (
        <div className={`min-h-screen flex flex-col p-1 font-mono ${interactivePhaseActive ? "interactive-phase" : "non-interactive-phase"}`}>
            {DEBUG_MODE && <div className="fixed top-2 right-2 z-50 bg-red-600 text-white px-2 py-1 text-sm">DEBUG MODE</div>}

            <ProfileHeader data={data} textPhaseActive={textPhaseActive} interactivePhaseActive={interactivePhaseActive} DEBUG_MODE={DEBUG_MODE} GlitchComponent={GlitchComponent} />

            <ProfileContent
                data={data}
                contentKey={contentKey}
                textPhaseActive={textPhaseActive}
                interactivePhaseActive={interactivePhaseActive}
                DEBUG_MODE={DEBUG_MODE}
                calculateDelay={calculateDelay}
                calculateFieldDelay={calculateFieldDelay}
            />

            <ProfileFooter textPhaseActive={textPhaseActive} interactivePhaseActive={interactivePhaseActive} DEBUG_MODE={DEBUG_MODE} GlitchComponent={GlitchComponent} />
        </div>
    )
}
