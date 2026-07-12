"use client"

import type { ResumeData } from "@/types/resume"

interface PlaceholderProfileProps {
    data: ResumeData
    textPhaseActive: boolean
    interactivePhaseActive: boolean
    DEBUG_MODE: boolean
    calculateDelay: (sectionIndex: number, subIndex?: number, itemIndex?: number) => number
    calculateFieldDelay: (sectionIndex: number, fieldIndex: number) => number
}

export function PlaceholderProfile({ data }: PlaceholderProfileProps) {
    return (
        <div className="flex flex-grow flex-col p-4 font-mono">
            <div className="rounded border border-zinc-700 bg-zinc-950/80 p-4">
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-400">
                    Temporary placeholder profile
                </p>
                <pre className="overflow-x-auto whitespace-pre-wrap break-words text-xs leading-6 text-zinc-200">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        </div>
    )
}
