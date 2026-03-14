
"use client"

import type React from 'react';
import { GlitchImage } from "../glitch-image";
import { AnimatedBorder } from '../animated-border';
import { ResumeData } from "@/types/resume";

interface PersonalInfoProps {
    data: ResumeData;
    textPhaseActive: boolean;
    DEBUG_MODE: boolean;
    calculateDelay: (sectionIndex: number, subIndex?: number, itemIndex?: number) => number;
    calculateFieldDelay: (sectionIndex: number, fieldIndex: number) => number;
    GlitchComponent: React.ElementType;
}

export function PersonalInfoSection({ data, textPhaseActive, DEBUG_MODE, calculateDelay, calculateFieldDelay, GlitchComponent }: PersonalInfoProps) {

    return (
        <AnimatedBorder header="BIO" delay={calculateDelay(data.personal_info.renderIndex, 2)} >
            <div className="space-y-2.5">
            {/* Row 1: Info + Photo - Responsive Grid */}
            <div className="grid grid-cols-[70%_30%]  lg:grid-cols-[65%_35%] gap-0 items-start ">
                {/* Col 1: Personal Details - Responsive Typography */}
                <div className="space-y-2">
                {/* Name - Responsive Text Sizes */}
                <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium tracking-wider">
                    <GlitchComponent
                    delay={calculateFieldDelay(data.personal_info.renderIndex, 0)}
                    shouldStart={textPhaseActive}
                    debugMode={DEBUG_MODE}
                    className="text-theme-primary uppercase"
                    >
                    {data.personal_info.name}
                    </GlitchComponent>
                </div>

                {/* Role - Responsive */}
                <div className="text-base font-semibold sm:text-lg lg:text-xl text-theme-accent tracking-wider">
                    <GlitchComponent
                    delay={calculateFieldDelay(data.personal_info.renderIndex, 1)}
                    shouldStart={textPhaseActive}
                    debugMode={DEBUG_MODE}
                    className="text-theme-accent"
                    >
                    {data.personal_info.role}
                    </GlitchComponent>
                </div>

                {/* Location - Responsive */} 
                <div className="text-sm text-theme-secondary"> 
                    <GlitchComponent
                    delay={calculateFieldDelay(data.personal_info.renderIndex, 2)}
                    shouldStart={textPhaseActive}
                    debugMode={DEBUG_MODE}
                    className="text-theme-muted"
                    >
                    {data.personal_info.location}
                    </GlitchComponent>
                </div>

                {/* Contact - Responsive */}
                <div className="text-sm break-all text-theme-secondary">
                    <a href="mailto:sairamkumar.m@outlook.com"
                    target="_blank"
                    rel="noopener noreferrer">
                    <GlitchComponent
                        delay={calculateFieldDelay(data.personal_info.renderIndex, 3)}
                        shouldStart={textPhaseActive}
                        debugMode={DEBUG_MODE}
                        className="text-theme-primary lowercase"
                    >
                        {data.personal_info.contact}
                    </GlitchComponent>
                    </a>
                </div>

                {/* Links - Responsive Flex */}
                <div className="hidden sm:flex sm:flex-wrap gap-1 sm:gap-2">
                    {data.links.items.map((link, index) => (
                    <a key={`link-${index}`} 
                    href={link.url} 
                    target="_blank"
                        className="leading-none"
                    rel="noopener noreferrer">
                        <GlitchComponent
                        bracket
                        delay={calculateDelay(data.links.renderIndex, 1, index)}
                        shouldStart={textPhaseActive}
                        debugMode={DEBUG_MODE}
                        className=" text-xs sm:text-sm text-theme-secondary"
                        >
                        {link.label}
                        </GlitchComponent>
                    </a>
                    ))}
                </div>
                <div className="inline-block lg:hidden xl:inline-block">
                    <div className="text-xs sm:text-sm text-theme-secondary  sm:pr-4">
                    <GlitchComponent
                        delay={calculateDelay(data.bio.renderIndex, 2)}
                        shouldStart={textPhaseActive}
                        debugMode={DEBUG_MODE}
                        className="text-theme-muted"
                    >
                        {(data.bio.content)}
                    </GlitchComponent>
                    </div>
                </div>
                </div>

                {/* Col 2: Photo + Links (phones) / Photo only (lg+) */}
                <div className=" flex flex-col items-end gap-1 ">
                {/* Photo */}
                <div className=""> 
                    <GlitchImage
                    src="/images/profile_image_noise.png"
                    alt="Profile"
                    delay={calculateFieldDelay(data.personal_info.renderIndex, 4)}
                    shouldStart={textPhaseActive}
                    debugMode={DEBUG_MODE}
                    className="h-full w-auto"
                    />
                </div>
                {/* Links - Show only on phones */}
                <div className="flex flex-wrap sm:hidden "> 
                    {data.links.items.map((link, index) => (
                    <a key={`link-${index}`}
                    href={link.url}
                    target="_blank"
                    className="leading-none" 
                    rel="noopener noreferrer">
                        <GlitchComponent
                        bracket
                        delay={calculateDelay(data.links.renderIndex, 1, index)}
                        shouldStart={textPhaseActive}
                        debugMode={DEBUG_MODE}
                        className=" text-xs sm:text-sm text-theme-secondary"
                        >
                        {link.label}
                        </GlitchComponent>
                    </a>
                    ))}
                </div>
                </div>
            </div>

            {/* Row 2: Bio - Enhanced Responsive */}
            <div className="hidden lg:inline-block xl:hidden">
                <div className="text-xs sm:text-sm text-theme-secondary tracking-wide">
                <GlitchComponent
                    delay={calculateDelay(data.bio.renderIndex, 2)}
                    shouldStart={textPhaseActive}
                    debugMode={DEBUG_MODE}
                    className="text-theme-muted"
                >
                    {data.bio.content}
                </GlitchComponent>
                </div>
            </div>
            </div>
        </AnimatedBorder>
    )
}
