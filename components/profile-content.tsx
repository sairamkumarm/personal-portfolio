"use client"

import type { ComponentType } from "react"
import type { ResumeData } from "@/types/resume"
import { RenderedProfile } from "./profiles/rendered-profile/rendered-profile"
import { JsonProfile } from "./profiles/json-profile"
import { type ContentKey } from "@/types/types"


interface ProfileContentProps {
    data: ResumeData
    contentKey: ContentKey
    textPhaseActive: boolean
    interactivePhaseActive: boolean
    DEBUG_MODE: boolean
    calculateDelay: (sectionIndex: number, subIndex?: number, itemIndex?: number) => number
    calculateFieldDelay: (sectionIndex: number, fieldIndex: number) => number
}

const contentRegistry: Record<ContentKey, ComponentType<any>> = {
    profile: RenderedProfile,
    json: JsonProfile,
}

export function ProfileContent({
    data,
    contentKey,
    textPhaseActive,
    interactivePhaseActive,
    DEBUG_MODE,
    calculateDelay,
    calculateFieldDelay,
}: ProfileContentProps) {
    const ActiveContent = contentRegistry[contentKey]

    return (
        <div className="flex flex-grow flex-col">
            <ActiveContent
                data={data}
                textPhaseActive={textPhaseActive}
                interactivePhaseActive={interactivePhaseActive}
                DEBUG_MODE={DEBUG_MODE}
                calculateDelay={calculateDelay}
                calculateFieldDelay={calculateFieldDelay}
            />
        </div>
    )
}