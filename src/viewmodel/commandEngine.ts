/**
 * Command engine: parse input, resolve to known command, provide autocomplete.
 * No React. Used by ViewModel.
 */

import {
  COMMAND_ALIASES,
  getCommandSuggestions,
  type KnownCommand,
} from '../model/commands.js'

export type SpecialCommandKey =
  | 'man'
  | 'whoami'
  | 'proc'
  | 'skillsStats'
  | 'arch'
  | 'designDoc'
  | 'cvDownload'
  | 'experienceVerbose'
  | 'experienceTimeline'
  | 'systems'
  | 'principles'
  | 'research'

export type ParsedCommand =
  | { type: 'known'; command: KnownCommand }
  | { type: 'special'; key: SpecialCommandKey }
  | { type: 'unknown'; input: string }

const EMPTY = '' as const

const SPECIAL_MAN = 'man shahzad'

/**
 * Parses raw user input into known command, special (output-only), or unknown.
 */
export function parseCommand(raw: string): ParsedCommand {
  const trimmed = raw.trim()
  if (trimmed === EMPTY) {
    return { type: 'unknown', input: trimmed }
  }
  const normalized = trimmed.toLowerCase()
  if (normalized === SPECIAL_MAN) {
    return { type: 'special', key: 'man' }
  }
  if (normalized === 'whoami') {
    return { type: 'special', key: 'whoami' }
  }
  if (normalized === 'cat /proc/shahzad') {
    return { type: 'special', key: 'proc' }
  }
  if (normalized === 'skills --stats') {
    return { type: 'special', key: 'skillsStats' }
  }
  if (normalized === 'arch') {
    return { type: 'special', key: 'arch' }
  }
  if (normalized === 'design --doc') {
    return { type: 'special', key: 'designDoc' }
  }
  if (normalized === 'cv --download') {
    return { type: 'special', key: 'cvDownload' }
  }
  if (normalized === 'experience --verbose') {
    return { type: 'special', key: 'experienceVerbose' }
  }
  if (normalized === 'experience --timeline') {
    return { type: 'special', key: 'experienceTimeline' }
  }
  if (normalized === 'systems') {
    return { type: 'special', key: 'systems' }
  }
  if (normalized === 'principles') {
    return { type: 'special', key: 'principles' }
  }
  if (normalized === 'research') {
    return { type: 'special', key: 'research' }
  }
  if (normalized in COMMAND_ALIASES) {
    return { type: 'known', command: COMMAND_ALIASES[normalized] }
  }
  return { type: 'unknown', input: trimmed }
}

/**
 * Returns suggestions for tab-complete. Empty partial = all commands.
 */
export function getSuggestions(partial: string): KnownCommand[] {
  return getCommandSuggestions(partial)
}

/**
 * Returns the next suggestion for cycling (Tab). Wraps around.
 */
export function getNextAutocomplete(
  _partial: string,
  suggestions: readonly KnownCommand[],
  currentIndex: number,
): KnownCommand | null {
  if (suggestions.length === 0) return null
  const next = (currentIndex + 1) % suggestions.length
  return suggestions[next]
}

/**
 * Returns the single suggestion when there's exactly one match (for full autocomplete).
 */
export function getSingleSuggestion(partial: string): KnownCommand | null {
  const list = getCommandSuggestions(partial)
  if (list.length === 1) return list[0] ?? null
  return null
}
