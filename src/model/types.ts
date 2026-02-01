/**
 * Model layer: pure data types and interfaces.
 * No React imports. Replaceable by API types later.
 */

export interface AboutData {
  name: string
  tagline: string
  bio: string
}

export interface SkillGroup {
  name: string
  items: string[]
}

export interface ProjectData {
  id: string
  name: string
  description: string
  url?: string
  stars?: number
}

export interface EmploymentEntry {
  id: string
  role: string
  company: string
  period: string
  description: string
}

export interface ContactData {
  email: string
  location?: string
  github?: string
  linkedin?: string
  twitter?: string
}

export interface Astra88Data {
  tagline: string
  description: string
  offerings: string[]
}

export type SectionId =
  | 'help'
  | 'about'
  | 'skills'
  | 'projects'
  | 'opensource'
  | 'astra88'
  | 'contact'
  | 'experience'
