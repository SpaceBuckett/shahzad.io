/**
 * Model layer: command definitions and constants.
 * No React imports.
 */

import type { SectionId } from './types.js'

export const KNOWN_COMMANDS: readonly SectionId[] = [
  'help',
  'about',
  'skills',
  'projects',
  'experience',
  'astra88',
  'contact',
  'opensource',
] as const

export type KnownCommand = (typeof KNOWN_COMMANDS)[number]

export const COMMAND_ALIASES: Readonly<Record<string, KnownCommand>> = {
  help: 'help',
  about: 'about',
  who: 'about',
  skills: 'skills',
  projects: 'projects',
  work: 'projects',
  experience: 'experience',
  employment: 'experience',
  jobs: 'experience',
  opensource: 'opensource',
  oss: 'opensource',
  astra88: 'astra88',
  astra: 'astra88',
  contact: 'contact',
} as const

export function getCommandSuggestions(partial: string): KnownCommand[] {
  if (!partial.trim()) return [...KNOWN_COMMANDS]
  const lower = partial.toLowerCase()
  return KNOWN_COMMANDS.filter((c) => c.startsWith(lower))
}

export const HELP_TEXT =
  'help        – list commands\n' +
  'about       – about me\n' +
  'skills      – skill groups (--stats for metrics)\n' +
  'projects    – projects\n' +
  'experience  – experience (--verbose, --timeline)\n' +
  'astra88     – Astra88 studio\n' +
  'contact     – contact\n' +
  'clear       – clear terminal\n' +
  'man shahzad – man page\n' +
  'arch        – ASCII diagrams\n' +
  'cv --download  systems  principles  research – (advanced)'
