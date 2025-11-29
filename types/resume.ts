export interface PersonalInfo {
  name: string
  location: string
  role: string
  contact: string
  renderIndex: number
}

export interface Link {
  label: string
  url: string
}

export interface LinksSection {
  items: Link[]
  renderIndex: number
}

export interface BioSection {
  content: string
  renderIndex: number
}

export interface SkillCategory {
  name: string
  skills: string[]
}

export interface SkillsSection {
  categories: SkillCategory[]
  renderIndex: number
}

export interface Project {
  name: string
  headline: string
  description: string[]
  stack: string[]
  links: Link[]
}

export interface ProjectsSection {
  items: Project[]
  renderIndex: number
}

export interface Experience {
  org: string
  role: string
  duration: string
  description: string[]
}

export interface ExperienceSection {
  items: Experience[]
  renderIndex: number
}

export interface Education {
  degree: string
  institution: string
  duration: string
  grade:string
}

export interface EducationSection {
  items: Education[]
  renderIndex: number
}

export interface ResumeData {
  personal_info: PersonalInfo
  links: LinksSection
  bio: BioSection
  skills: SkillsSection
  sections: {
    projects: ProjectsSection
    experience: ExperienceSection
    education: EducationSection
  }
}
