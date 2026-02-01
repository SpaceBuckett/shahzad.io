/**
 * Per-command latency emulation. No React.
 */

import type { KnownCommand } from '../model/commands.js'
import type { ParsedCommand, SpecialCommandKey } from './commandEngine.js'

export const DEFAULT_LATENCY_MS = 500

/** Promise-based delay for simulated command latency. */
export function setLatency(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const KNOWN_LATENCY_MS: Partial<Record<KnownCommand, number>> = {
  help: 0,
  about: 400,
  skills: 700,
  projects: 1500,
  experience: 1500,
  opensource: 800,
  astra88: 400,
  contact: 300,
}

const SPECIAL_LATENCY_MS: Partial<Record<SpecialCommandKey, number>> = {
  man: 600,
  whoami: 0,
  proc: 400,
  skillsStats: 600,
  arch: 600,
  designDoc: 500,
  cvDownload: 0,
  experienceVerbose: 1200,
  experienceTimeline: 800,
  systems: 800,
  principles: 800,
  research: 800,
}

export function getLatencyForParsed(parsed: ParsedCommand): number {
  if (parsed.type === 'unknown') return 0
  if (parsed.type === 'known') {
    return KNOWN_LATENCY_MS[parsed.command] ?? DEFAULT_LATENCY_MS
  }
  return SPECIAL_LATENCY_MS[parsed.key] ?? DEFAULT_LATENCY_MS
}

const LOADING_MESSAGES: Record<string, string> = {
  about: '[system] Loading about... Please wait.',
  skills: '[system] Loading skills... Please wait.',
  projects: '[system] Loading projects... Please wait.',
  experience: '[system] Loading experience... Please wait.',
  opensource: '[system] Loading opensource... Please wait.',
  astra88: '[system] Loading astra88... Please wait.',
  contact: '[system] Loading contact... Please wait.',
  man: '[system] Loading man page... Please wait.',
  proc: '[system] Loading /proc... Please wait.',
  skillsStats: '[system] Loading stats... Please wait.',
  arch: '[system] Loading diagrams... Please wait.',
  designDoc: '[system] Loading design doc... Please wait.',
  experienceVerbose: '[system] Loading experience (verbose)... Please wait.',
  experienceTimeline: '[system] Loading timeline... Please wait.',
  systems: '[system] Loading systems... Please wait.',
  principles: '[system] Loading principles... Please wait.',
  research: '[system] Loading research... Please wait.',
}

export function getLoadingMessage(parsed: ParsedCommand): string {
  if (parsed.type === 'unknown') return ''
  if (parsed.type === 'known') {
    return LOADING_MESSAGES[parsed.command] ?? `[system] Loading ${parsed.command}... Please wait.`
  }
  return LOADING_MESSAGES[parsed.key] ?? '[system] Loading... Please wait.'
}
