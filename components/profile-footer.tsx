"use client"
import { AnimatedBorder } from "./animated-border";
import { RenderSequence } from "./render-sequence";

interface ProfileFooterProps {
    textPhaseActive: boolean;
    interactivePhaseActive: boolean;
    DEBUG_MODE: boolean;
    GlitchComponent: React.ElementType;
}

export function ProfileFooter({ textPhaseActive, interactivePhaseActive, DEBUG_MODE, GlitchComponent }: ProfileFooterProps) {
    return (<RenderSequence phase="lines" delay={DEBUG_MODE ? 0 : 0}>
        <footer className="text-center text-xs sm:text-sm bg-theme-primary">
            <AnimatedBorder className="p-2">
                <div className="py-0">
                    <GlitchComponent bracket delay={0} shouldStart={textPhaseActive} debugMode={DEBUG_MODE} className="uppercase">
                        <span className="">COPYRIGHT © 2026 SAIRAMKUMAR M</span>
                    </GlitchComponent>
                </div>
            </AnimatedBorder>
        </footer>
    </RenderSequence>)
}