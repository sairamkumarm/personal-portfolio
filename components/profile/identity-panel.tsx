
"use client"

import type React from 'react';
import { GlitchImage } from "../glitch-image";
import { AnimatedDivider } from "../animated-divider";
import { SectionPoint } from "../section-point";
import { ResumeData } from "@/types/resume";

interface IdentityPanelProps {
    data: ResumeData;
    textPhaseActive: boolean;
    DEBUG_MODE: boolean;
    calculateDelay: (sectionIndex: number, subIndex?: number, itemIndex?: number) => number;
    calculateFieldDelay: (sectionIndex: number, fieldIndex: number) => number;
    GlitchComponent: React.ElementType;
}

export function IdentityPanel({ data, textPhaseActive, DEBUG_MODE, calculateDelay, calculateFieldDelay, GlitchComponent }: IdentityPanelProps) {

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 z-0">
        {/* Personal Info Block - Enhanced Responsive Design */}
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

          <AnimatedDivider delay={calculateDelay(data.personal_info.renderIndex, 2)} />
        </div>

        {/* Skills Block - Enhanced Responsive */}
        <div className="space-y-4">
          <div className="text-base sm:text-lg font-medium tracking-wider">
            <GlitchComponent
              delay={calculateDelay(data.skills.renderIndex)}
              shouldStart={textPhaseActive}
              debugMode={DEBUG_MODE}
              className="text-theme-primary"
            >
              <SectionPoint /> STACK
            </GlitchComponent>
          </div>
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
          <AnimatedDivider delay={calculateDelay(data.skills.renderIndex, 2)} />
        </div>

        {/* Education Section - Enhanced Responsive */}
        <div className="space-y-4">
          <div className="text-base sm:text-lg font-medium tracking-wider">
            <GlitchComponent
              delay={calculateDelay(data.sections.education.renderIndex)}
              shouldStart={textPhaseActive}
              debugMode={DEBUG_MODE}
              className="text-theme-primary"
            >
              <SectionPoint /> EDUCATION
            </GlitchComponent>
          </div>

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
          <AnimatedDivider delay={calculateDelay(data.sections.education.renderIndex)} />
        </div>
      </div>
    )
}
