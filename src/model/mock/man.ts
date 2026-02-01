/**
 * UNIX-style man page for SHAHZAD(1). Static, scrollable in terminal.
 * Variant by terminal width; formatting follows man(1) conventions.
 */

export type ManVariant = 'wide' | 'narrow'

function getManVariant(): ManVariant {
  if (typeof window === 'undefined') return 'wide'
  return window.innerWidth < 520 ? 'narrow' : 'wide'
}

const MAN_WIDE = [
  '',
  'SHAHZAD(1)                    General Commands Manual                    SHAHZAD(1)',
  '',
  'NAME',
  '     Shahzad Ahmad – Senior Software Engineer, systems builder, founder of Astra88.',
  '',
  'SYNOPSIS',
  '     shahzad [--backend] [--mobile] [--fullstack] [--research]',
  '',
  'DESCRIPTION',
  '     Senior engineer focused on high-performance backend systems, developer',
  '     experience, and production-grade software. Builds scalable and resilient',
  '     systems from the ground up. Backend (Golang), mobile (Flutter), full-stack',
  '     (React/TypeScript), and applied research.',
  '',
  'OPTIONS',
  '     --backend   Golang, distributed systems, infra (Cloud, Kubernetes).',
  '     --mobile    Flutter, real-time apps, cross-platform.',
  '     --fullstack React, Next.js, TypeScript, SSR, APIs.',
  '     --research  Emerging tech, AI/ML, systems innovation.',
  '',
  'SEE ALSO',
  '     astra88(1), projects(1), open-source(1), help(1).',
  '',
  'PORTFOLIO 0.1                        2026                         SHAHZAD(1)',
  '',
].join('\n')

const MAN_NARROW = [
  '',
  'SHAHZAD(1)              General Commands Manual              SHAHZAD(1)',
  '',
  'NAME',
  '     Shahzad Ahmad – Senior Software Engineer, systems builder, Astra88.',
  '',
  'SYNOPSIS',
  '     shahzad [--backend] [--mobile] [--fullstack] [--research]',
  '',
  'DESCRIPTION',
  '     Senior engineer: backend systems, developer experience, production',
  '     software. Scalable, resilient systems. Backend (Golang), mobile',
  '     (Flutter), full-stack (React/TypeScript), research.',
  '',
  'OPTIONS',
  '     --backend   Golang, distributed systems, infra.',
  '     --mobile    Flutter, real-time, cross-platform.',
  '     --fullstack React, Next.js, TypeScript, APIs.',
  '     --research  AI/ML, systems innovation.',
  '',
  'SEE ALSO',
  '     astra88(1), projects(1), open-source(1), help(1).',
  '',
  'PORTFOLIO 0.1                    2026                     SHAHZAD(1)',
  '',
].join('\n')

export function getManShahzad(variant?: ManVariant): string {
  const v = variant ?? getManVariant()
  return v === 'narrow' ? MAN_NARROW : MAN_WIDE
}
