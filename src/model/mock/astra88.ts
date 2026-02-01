/**
 * Mock data provider: Astra88. Replace with API call later.
 * Positioned as venture: boutique studio + research lab, not employment.
 */

import type { Astra88Data } from '../types.js'

export function getAstra88(): Astra88Data {
  return {
    tagline: 'Boutique engineering studio & research lab',
    description:
      'Mission: custom AI and software solutions for product teams; research on emerging tech (agents, tooling, infra). ' +
      'Solves: high-throughput backends, cross-platform mobile, and experimental systems that need Go, React, or Flutter in production.',
    offerings: [
      'Backend & APIs (Golang, event-driven, microservices)',
      'Full-stack (Go + React/Next.js) and mobile (Flutter)',
      'System design, architecture reviews, and mentorship',
      'Research engagements: agents, DX, observability',
    ],
  }
}

/** Mock fs for astra88 subsystem: ls output. */
export function getAstra88Ls(): string {
  return 'README.md  bin/  lib/  research/  engagements/'
}

/** Mock fs for astra88 subsystem: tree output. */
export function getAstra88Tree(): string {
  return [
    '.',
    '├── README.md',
    '├── bin/',
    '├── lib/',
    '├── research/',
    '│   ├── agents',
    '│   └── observability',
    '└── engagements/',
  ].join('\n')
}

/** Mock fs for astra88 subsystem: cat README.md. */
export function getAstra88Readme(): string {
  return [
    '# Astra88',
    '',
    'Boutique engineering studio & research lab.',
    'Custom AI and software. Go, React, Flutter.',
    '',
    '  astra88 ls    – list',
    '  astra88 tree  – tree',
    '  exit          – leave',
  ].join('\n')
}
