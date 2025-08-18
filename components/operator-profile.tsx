"use client"

import { useState, useEffect, useMemo } from "react"
import type { ResumeData } from "@/types/resume"
import { GlitchText } from "./glitch-text"
import { GlitchImage } from "./glitch-image"
import { RenderSequence } from "./render-sequence"
import { AnimatedDivider } from "./animated-divider"
import { ThemeToggle } from "./theme-toggle"
import { SectionPoint } from "./section-point"

interface OperatorProfileProps {
  data: ResumeData
}

// 🚨 DEBUG MODE - Set to true to disable all animations
const DEBUG_MODE = true

// FIXED: Centralized delay calculation system with stable values
const SECTION_BASE_DELAY = 300
const SUBSECTION_DELAY = 150
const ITEM_DELAY = 50
const FIELD_DELAY = 150

// FIXED: Memoized delay calculation functions
const calculateDelay = (sectionIndex: number, subIndex = 0, itemIndex = 0): number => {
  if (DEBUG_MODE) return 0
  return sectionIndex * SECTION_BASE_DELAY + subIndex * SUBSECTION_DELAY + itemIndex * ITEM_DELAY
}

const calculateFieldDelay = (sectionIndex: number, fieldIndex: number): number => {
  if (DEBUG_MODE) return 0
  return sectionIndex * SECTION_BASE_DELAY + fieldIndex * FIELD_DELAY
}

export function OperatorProfile({ data }: OperatorProfileProps) {
  const [currentPhase, setCurrentPhase] = useState<"lines" | "text" | "interactive">(
    DEBUG_MODE ? "interactive" : "lines",
  )

  // FIXED: Memoized component selector to prevent re-creation
  const GlitchComponent = GlitchText

  // FIXED: Stable phase management
  useEffect(() => {
    if (DEBUG_MODE) {
      setCurrentPhase("interactive")
      return
    }

    let linesTimer: NodeJS.Timeout
    let textTimer: NodeJS.Timeout

    // Phase 1: Lines and dividers (0-2s)
    linesTimer = setTimeout(() => {
      setCurrentPhase("text")
    }, 2000)

    // Phase 2: Text content (2-6s)
    textTimer = setTimeout(() => {
      setCurrentPhase("interactive")
    }, 6000)

    return () => {
      clearTimeout(linesTimer)
      clearTimeout(textTimer)
    }
  }, []) // FIXED: Empty dependency array to prevent re-runs

  // FIXED: Memoized phase calculations
  const textPhaseActive = useMemo(() => {
    return DEBUG_MODE || currentPhase === "text" || currentPhase === "interactive"
  }, [currentPhase])

  const interactivePhaseActive = useMemo(() => {
    return DEBUG_MODE || currentPhase === "interactive"
  }, [currentPhase])

  return (
    <div
      className={`min-h-screen bg-theme-primary text-theme-primary font-mono ${interactivePhaseActive ? "interactive-phase" : "non-interactive-phase"}`}>
      {/* Debug Mode Indicator */}
      {DEBUG_MODE && <div className="fixed top-2 right-2 z-50 bg-red-600 text-white px-2 py-1 text-sm">DEBUG MODE</div>}

      {/* Navigation Bar - Enhanced Responsive */}
      <RenderSequence phase="lines" delay={DEBUG_MODE ? 0 : 0}>
        <nav className="fixed top-0 left-0 right-0 z-[9999] bg-theme-primary px-3 sm:px-4 lg:px-6 py-2">
          <div
            className="border-t border-b border-theme-primary border-build"
            style={{ animationDelay: DEBUG_MODE ? "0s" : "0.2s" }}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm py-2 gap-2 sm:gap-4">
              {/* Left side - Title with backdrop blur */}
              <div className="tracking-wider backdrop-blur-md bg-theme-secondary pr-1 w-fit flex gap-1 items-center">
                <GlitchComponent bracket delay={0} shouldStart={textPhaseActive} debugMode={DEBUG_MODE}>
                  {data.personal_info.name}
                </GlitchComponent>
                <span className="text-theme-secondary">
                  <GlitchComponent delay={0} className="" shouldStart={textPhaseActive} debugMode={DEBUG_MODE}>
                    <b className="text-theme-accent" style={{ fontFamily: "SF Mono, Monaco, Consolas, monospace" }}>
                      {" "}
                      ⁝⁝⁝
                    </b>{" "}
                    <span>PROFILEsdsd</span>
                  </GlitchComponent>
                </span>
              </div>

              {/* Right side - Actions with backdrop blur */}
              <div className="flex gap-2 sm:gap-4 items-center flex-wrap">
                <RenderSequence phase="interactive" delay={DEBUG_MODE ? 0 : 6200}>
                <a
                  href={process.env.NEXT_PUBLIC_RESUME_STATIC_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="resume-link"
                >
                  <GlitchComponent bracket delay={0} shouldStart={textPhaseActive} debugMode={DEBUG_MODE}>
                    RESUME.PDF
                  </GlitchComponent>
                  </a>
                </RenderSequence>
                <RenderSequence phase="interactive" delay={DEBUG_MODE ? 0 : 6400}>
                <a href="mailto:sairamkumar.m@outlook.com" 
                  target="_blank"
                  rel="noopener noreferrer">
                  <GlitchComponent bracket delay={0} shouldStart={textPhaseActive} debugMode={DEBUG_MODE}>
                    CONTACT
                  </GlitchComponent>
                  </a>
                </RenderSequence>
                <RenderSequence phase="interactive" delay={DEBUG_MODE ? 0 : 6600}>
                  <ThemeToggle />
                </RenderSequence>
              </div>
            </div>
          </div>
        </nav>
      </RenderSequence>

      {/* Main Content - Enhanced Responsive Grid */}
      <div className="pt-16 sm:pt-20 lg:pt-16 grid grid-cols-1 lg:grid-cols-2 min-h-screen z-0">
        {/* Left Pane - Identity Panel */}
        <div className="">
          <div className="relative">
            <RenderSequence phase="lines" delay={DEBUG_MODE ? 0 : 400}>
              <div className="absolute right-0 top-0 w-px h-full hidden lg:block">
                <div className="border-r border-theme-secondary border-build"></div>
              </div>
            </RenderSequence>

            <div className="p-3 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 z-0">
              {/* Personal Info Block - Enhanced Responsive Design */}
              <div className="space-y-4 lg:space-y-6">
                {/* Row 1: Info + Photo - Responsive Grid */}
                <div className="grid grid-cols-[70%_30%] lg:grid-cols-3 gap-0 lg:gap-6 items-start">
                  {/* Col 1: Personal Details - Responsive Typography */}
                  <div className="sm:col-span-1  lg:col-span-2 space-y-2 lg:space-y-3">
                    {/* Name - Responsive Text Sizes */}
                    <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium tracking-wider">
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
                    <div className="text-xs sm:text-sm text-theme-secondary">
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
                    <div className="text-xs break-all sm:text-sm text-theme-secondary">
                      <a href="mailto:sairamkumar.m@outlook.com"
                      target="_blank"
                      rel="noopener noreferrer">
                        <GlitchComponent
                          delay={calculateFieldDelay(data.personal_info.renderIndex, 3)}
                          shouldStart={textPhaseActive}
                          debugMode={DEBUG_MODE}
                          className="text-theme-secondary"
                        >
                          {data.personal_info.contact}
                        </GlitchComponent>
                      </a>
                    </div>

                    {/* Links - Responsive Flex */}
                    <div className="hidden md:flex md:flex-wrap gap-1 sm:gap-2 pt-2">
                      {data.links.items.map((link, index) => (
                        <a key={`link-${index}`} 
                        href={link.url} 
                        target="_blank"
                        rel="noopener noreferrer">
                          <GlitchComponent
                            bracket
                            delay={calculateDelay(data.links.renderIndex, 1, index)}
                            shouldStart={textPhaseActive}
                            debugMode={DEBUG_MODE}
                            className=" text-xs sm:text-sm"
                          >
                            {link.label}
                          </GlitchComponent>
                        </a>
                      ))}
                    </div>
                    
                    <div className="inline-block md:hidden">
                      <div className="text-xs sm:text-sm leading-relaxed text-theme-secondary tracking-wide">
                        <GlitchComponent
                          delay={calculateDelay(data.bio.renderIndex, 2)}
                          shouldStart={textPhaseActive}
                          debugMode={DEBUG_MODE}
                          className="text-theme-secondary"
                        >
                          {data.bio.content}
                        </GlitchComponent>
                      </div>
                    </div>
                  </div>

                  {/* Col 2: Photo + Links (phones) / Photo only (lg+) */}
                  <div className="flex flex-col items-center space-y-0.5">
                    {/* Photo */}
                    <div className="max-w-[100%] md:w-full lg:w-full h-auto">
                      <GlitchImage
                        src="/images/profile_image_noise.png"
                        alt="Profile"
                        delay={calculateFieldDelay(data.personal_info.renderIndex, 4)}
                        shouldStart={textPhaseActive}
                        debugMode={DEBUG_MODE}
                        className="w-full h-auto object-cover "
                      />
                    </div>
                    {/* Links - Show only on phones */}
                    <div className="flex gap-0 lg:hidden">
                      {data.links.items.map((link, index) => (
                        <a key={`link-${index}`}
                        href={link.url}
                        target="_blank"
                        className=""
                        rel="noopener noreferrer">
                          <GlitchComponent
                            bracket
                            delay={calculateDelay(data.links.renderIndex, 1, index)}
                            shouldStart={textPhaseActive}
                            debugMode={DEBUG_MODE}
                            className=" text-xs sm:text-sm"
                          >
                            {link.label}
                          </GlitchComponent>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 2: Bio - Enhanced Responsive */}
                <div className="hidden md:inline pt-2 lg:pt-4">
                  <div className="text-xs sm:text-sm leading-relaxed text-theme-secondary tracking-wide">
                    <GlitchComponent
                      delay={calculateDelay(data.bio.renderIndex, 2)}
                      shouldStart={textPhaseActive}
                      debugMode={DEBUG_MODE}
                      className="text-theme-secondary"
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
                              className=" text-xs"
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
          </div>
        </div>

        {/* Right Pane - Projects & Dynamic Content - Enhanced Responsive */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
          {/* Projects Section - Enhanced Responsive */}
          <div className="space-y-6">
            <div className="text-base font-medium sm:text-lg tracking-wider">
              <GlitchComponent
                delay={calculateDelay(data.sections.projects.renderIndex)}
                shouldStart={textPhaseActive}
                debugMode={DEBUG_MODE}
                className="text-theme-primary"
              >
                <SectionPoint /> PROJECTS
              </GlitchComponent>
            </div>

            {data.sections.projects.items.map((project, index) => (
              <div key={`project-${index}`} className="space-y-4">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-2 lg:gap-4">
                  <div className="text-xs sm:text-sm tracking-wider flex-1">
                    <GlitchComponent
                      delay={calculateDelay(data.sections.projects.renderIndex, 1, index * 15)}
                      shouldStart={textPhaseActive}
                      debugMode={DEBUG_MODE}
                      className="text-theme-primary"
                    >
                      {project.name} — {project.headline}
                    </GlitchComponent>
                  </div>
                  <div className="text-xs sm:text-sm">
                    <div className="flex gap-1 sm:gap-2 flex-wrap">
                      {project.links.map((link, linkIndex) => (
                        <a 
                        key={`project-${index}-link-${linkIndex}`} 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer">
                          <GlitchComponent
                            bracket
                            delay={calculateDelay(data.sections.projects.renderIndex, 1, index * 15 + linkIndex + 1)}
                            shouldStart={textPhaseActive}
                            debugMode={DEBUG_MODE}
                            className=""
                          >
                            {link.label}
                          </GlitchComponent>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="flex flex-wrap font-normal gap-1">
                    {project.stack.map((tech, techIndex) => (
                      <span key={`project-${index}-tech-${techIndex}`}>
                        <GlitchComponent
                          bracket
                          delay={calculateDelay(data.sections.projects.renderIndex, 1, index * 15 + techIndex + 3)}
                          shouldStart={textPhaseActive}
                          debugMode={DEBUG_MODE}
                          className=""
                        >
                          {tech}
                        </GlitchComponent>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
                  {/* Project Description - Enhanced Responsive */}
                  <div className="leading-relaxed text-theme-muted font-light tracking-wide space-y-1">
                    {project.description.length === 1 ? (
                      // Single item - render as paragraph
                      <GlitchComponent
                        delay={calculateDelay(data.sections.projects.renderIndex, 2, index * 15)}
                        shouldStart={textPhaseActive}
                        debugMode={DEBUG_MODE}
                        className="text-theme-muted"
                      >
                        {project.description[0]}
                      </GlitchComponent>
                    ) : (
                      // Multiple items - render as bullet points
                      project.description.map((point, pointIndex) => (
                        <div key={`project-${index}-desc-${pointIndex}`} className="flex">
                          <span className="text-theme-primary mr-2 flex-shrink-0">
                            <GlitchComponent
                              delay={calculateDelay(data.sections.projects.renderIndex, 2, index * 15 + pointIndex)}
                              shouldStart={textPhaseActive}
                              debugMode={DEBUG_MODE}
                              className="text-theme-muted"
                            >
                              •
                            </GlitchComponent>
                          </span>
                          <span>
                            <GlitchComponent
                              delay={calculateDelay(data.sections.projects.renderIndex, 2, index * 15 + pointIndex)}
                              shouldStart={textPhaseActive}
                              debugMode={DEBUG_MODE}
                              className="text-theme-muted"
                            >
                              {point}
                            </GlitchComponent>
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <AnimatedDivider delay={calculateDelay(data.sections.projects.renderIndex, 3, index)} />
              </div>
            ))}
          </div>

          {/* Experience Section - Enhanced Responsive */}
          <div className="space-y-6">
            <div className="text-base sm:text-lg font-medium tracking-wider">
              <GlitchComponent
                delay={calculateDelay(data.sections.experience.renderIndex)}
                shouldStart={textPhaseActive}
                debugMode={DEBUG_MODE}
                className="text-theme-primary"
              >
                <SectionPoint /> EXPERIENCE
              </GlitchComponent>
            </div>

            {data.sections.experience.items.map((exp, index) => (
              <div key={`exp-${index}`} className="space-y-4">
                <div className="text-xs sm:text-sm tracking-wider">
                  <GlitchComponent
                    delay={calculateDelay(data.sections.experience.renderIndex, 1, index * 10)}
                    shouldStart={textPhaseActive}
                    debugMode={DEBUG_MODE}
                    className="text-theme-primary"
                  >
                    {exp.org}
                  </GlitchComponent>
                  <div className="grid grid-cols-[70%_30%] lg:grid-cols-2 gap-0 lg:gap-6 items-start">
                    <div className="text-xs sm:text-sm space-y-1">
                      <div className="sm:col-span-1 lg:col-span-1 space-y-2 lg:space-y-3">
                        <div>
                          <span className="text-theme-primary">
                            <GlitchComponent
                              delay={calculateDelay(data.sections.experience.renderIndex, 1, index * 10 + 1)}
                              shouldStart={textPhaseActive}
                              debugMode={DEBUG_MODE}
                              className="text-theme-primary"
                            >
                              ROLE:{" "}
                            </GlitchComponent>
                          </span>
                          <span className="text-theme-secondary">
                            <GlitchComponent
                              delay={calculateDelay(data.sections.experience.renderIndex, 1, index * 10 + 2)}
                              shouldStart={textPhaseActive}
                              debugMode={DEBUG_MODE}
                              className="text-theme-secondary"
                            >
                              {exp.role}
                            </GlitchComponent>
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-theme-primary">
                          <GlitchComponent
                            delay={calculateDelay(data.sections.experience.renderIndex, 1, index * 10 + 3)}
                            shouldStart={textPhaseActive}
                            debugMode={DEBUG_MODE}
                            className="text-theme-primary"
                          >
                            DURATION:{" "}
                          </GlitchComponent>
                        </span>
                        <span className="text-theme-secondary">
                          <GlitchComponent
                            delay={calculateDelay(data.sections.experience.renderIndex, 1, index * 10 + 4)}
                            shouldStart={textPhaseActive}
                            debugMode={DEBUG_MODE}
                            className="text-theme-secondary"
                          >
                            {exp.duration}
                          </GlitchComponent>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experience Description - Enhanced Responsive */}
                <div className="text-xs sm:text-sm leading-relaxed font-light text-theme-secondary tracking-wide space-y-1">
                  {exp.description.length === 1 ? (
                    // Single item - render as paragraph
                    <GlitchComponent
                      delay={calculateDelay(data.sections.experience.renderIndex, 2, index * 10)}
                      shouldStart={textPhaseActive}
                      debugMode={DEBUG_MODE}
                      className="text-theme-secondary"
                    >
                      {exp.description[0]}
                    </GlitchComponent>
                  ) : (
                    // Multiple items - render as bullet points
                    exp.description.map((point, pointIndex) => (
                      <div key={`exp-${index}-desc-${pointIndex}`} className="flex">
                        <span className="text-theme-primary mr-2 flex-shrink-0">
                          <GlitchComponent
                            delay={calculateDelay(data.sections.experience.renderIndex, 2, index * 10 + pointIndex)}
                            shouldStart={textPhaseActive}
                            debugMode={DEBUG_MODE}
                            className="text-theme-muted"
                          >
                            •
                          </GlitchComponent>
                        </span>
                        <span>
                          <GlitchComponent
                            delay={calculateDelay(data.sections.experience.renderIndex, 2, index * 10 + pointIndex)}
                            shouldStart={textPhaseActive}
                            debugMode={DEBUG_MODE}
                            className="text-theme-muted"
                          >
                            {point}
                          </GlitchComponent>
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <AnimatedDivider delay={calculateDelay(data.sections.experience.renderIndex, 3, index)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - Enhanced Responsive */}
      <RenderSequence phase="interactive" delay={DEBUG_MODE ? 0 : 4500}>
        <footer className="p-4 text-center text-xs sm:text-sm tracking-wider">
          <div className="border-t border-theme-primary border-build" style={{ animationDelay: "0s" }}>
            <div className="py-4">
              <span className="block sm:inline bracket-interactive"><span className="bracket-accent">[</span>BUILT BY SAIRAMKUMAR M<span className="bracket-accent">]</span></span>
              <span className="hidden sm:inline"> ⁝⁝⁝ </span>
              <span className="block sm:inline bracket-interactive"><span className="bracket-accent">[</span>NO COOKIES | NO TRACKERS<span className="bracket-accent">]</span></span>
            </div>
          </div>
        </footer>
      </RenderSequence>
    </div>
  )
}
