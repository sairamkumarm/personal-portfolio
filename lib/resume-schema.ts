
import { z } from 'zod';

export const PersonalInfoSchema = z.object({
  name: z.string(),
  location: z.string(),
  role: z.string(),
  contact: z.string(),
  renderIndex: z.number(),
});

export const LinkSchema = z.object({
  label: z.string(),
  url: z.string(),
});

export const LinksSectionSchema = z.object({
  items: z.array(LinkSchema),
  renderIndex: z.number(),
});

export const BioSectionSchema = z.object({
  content: z.string(),
  renderIndex: z.number(),
});

export const SkillCategorySchema = z.object({
  name: z.string(),
  skills: z.array(z.string()),
});

export const SkillsSectionSchema = z.object({
  categories: z.array(SkillCategorySchema),
  renderIndex: z.number(),
});

export const ProjectSchema = z.object({
  name: z.string(),
  headline: z.string(),
  description: z.array(z.string()),
  stack: z.array(z.string()),
  links: z.array(LinkSchema),
});

export const ProjectsSectionSchema = z.object({
  items: z.array(ProjectSchema),
  renderIndex: z.number(),
});

export const ExperienceSchema = z.object({
  org: z.string(),
  role: z.string(),
  duration: z.string(),
  description: z.array(z.string()),
});

export const ExperienceSectionSchema = z.object({
  items: z.array(ExperienceSchema),
  renderIndex: z.number(),
});

export const EducationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  duration: z.string(),
  grade: z.string(),
});

export const EducationSectionSchema = z.object({
  items: z.array(EducationSchema),
  renderIndex: z.number(),
});

export const ResumeDataSchema = z.object({
  personal_info: PersonalInfoSchema,
  links: LinksSectionSchema,
  bio: BioSectionSchema,
  skills: SkillsSectionSchema,
  sections: z.object({
    projects: ProjectsSectionSchema,
    experience: ExperienceSectionSchema,
    education: EducationSectionSchema,
  }),
});
