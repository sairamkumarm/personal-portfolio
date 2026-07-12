
"use client"

import React, { useEffect, useRef, useState } from 'react';
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
    const textColumnRef = useRef<HTMLDivElement | null>(null);
    const [textColumnHeight, setTextColumnHeight] = useState<number>(0);

    useEffect(() => {
        const node = textColumnRef.current;
        if (!node) return;

        const updateHeight = () => {
            setTextColumnHeight(node.getBoundingClientRect().height);
        };

        updateHeight();

        const observer = new ResizeObserver(updateHeight);
        observer.observe(node);

        window.addEventListener('resize', updateHeight);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    return (
        <AnimatedBorder header="BIO" delay={calculateDelay(data.personal_info.renderIndex, 2)} >
            <div className="">
                {/* Row 1: Info + Photo - Responsive Grid */}
                <div className="grid grid-cols-[70%_30%]  gap-0 items-start ">
                    {/* Col 1: Personal Details - Responsive Typography */}
                    <div ref={textColumnRef} className="space-y-1">
                        {/* Name - Responsive Text Sizes */}
                        <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium ">
                            <GlitchComponent
                                delay={calculateFieldDelay(data.personal_info.renderIndex, 0)}
                                shouldStart={textPhaseActive}
                                debugMode={DEBUG_MODE}
                                className="text-theme-primary"
                            >
                                {data.personal_info.name}
                            </GlitchComponent>
                        </div>

                        {/* Role - Responsive */}
                        <div className="text-sm lg:text-lg text-theme-secondary">
                            <GlitchComponent
                                delay={calculateFieldDelay(data.personal_info.renderIndex, 1)}
                                shouldStart={textPhaseActive}
                                debugMode={DEBUG_MODE}
                                className="text-theme-secondary"
                            >
                                {data.personal_info.role}
                            </GlitchComponent>
                        </div>

                        {/* Location - Responsive */}
                        <div className="text-sm lg:text-lg text-theme-secondary">
                            <GlitchComponent
                                delay={calculateFieldDelay(data.personal_info.renderIndex, 2)}
                                shouldStart={textPhaseActive}
                                debugMode={DEBUG_MODE}
                                className="text-theme-secondary"
                            >
                                {data.personal_info.location}
                            </GlitchComponent>
                        </div>

                        {/* Contact - Responsive */}
                        {/* <div className="text-sm break-all text-theme-secondary">
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
                        </div> */}

                        {/* Links - Responsive Flex */}
                        <div className="flex sm:flex-wrap gap-0.5 sm:gap-1">
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

                    {/* Col 2: Photo */}
                    <div className=" flex flex-col items-end">
                        <GlitchImage
                            src="images/formal_profile.jpeg"
                            alt="Profile picture, credit: Balaji Lakshman Reddy Karri"
                            delay={calculateFieldDelay(data.personal_info.renderIndex, 4)}
                            shouldStart={textPhaseActive}
                            debugMode={DEBUG_MODE}
                            squareSize={textColumnHeight || undefined}
                            className="profile-image-bw"
                        />
                    </div>
                </div>
            </div>
        </AnimatedBorder>
    )
}
