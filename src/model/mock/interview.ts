/**
 * Mock data: interview talking-point commands. Replace with API later.
 * Reuses existing data, goes deeper. Internal-doc tone.
 */

export function getExperienceVerbose(): string {
  return [
    'EXPERIENCE (verbose)',
    '───────────────────',
    '',
    'AntonX (2023–present): Backend / Fullstack / Mobile. Go services, React/Next.js, Flutter.',
    'NOW by HMC (2021–2023): Backend & mobile. PostgreSQL, Redis, Kafka; Flutter apps.',
    'UToR Digital (2019–2021): Senior Flutter. Platform channels, CI/CD, 100k+ users.',
    'Upwork (2018–2019): Freelance. Golang, React, Flutter prototypes.',
    '',
    'Overlap: AntonX and Astra88 (founder) run in parallel. Astra88 is venture, not employment.',
  ].join('\n')
}

export function getSystemsDoc(): string {
  return [
    'SYSTEMS',
    '───────',
    '',
    'Backend: Stateless services. Persistence at the edges. Event-driven where ordering matters.',
    'Frontend: Single source of truth. Minimal re-renders. MVVM here.',
    'Mobile: Platform channels for native; business logic in Dart.',
    'Infra: Docker, K8s, AWS/GCP. CI/CD, observability (Prometheus, Grafana).',
  ].join('\n')
}

export function getPrinciplesDoc(): string {
  return [
    'PRINCIPLES',
    '──────────',
    '',
    'Simplicity over cleverness. Readable code outlives smart code.',
    'Data shapes the design. Get the model right first.',
    'Fail fast, fail clearly. Errors should be actionable.',
    'Composition over inheritance. Small, testable units.',
  ].join('\n')
}

export function getResearchDoc(): string {
  return [
    'RESEARCH',
    '────────',
    '',
    'Emerging tech: agents, tooling, DX. Astra88 research lab.',
    'Focus: systems that scale, developer experience, observability.',
    'No buzzwords. Calm, honest tradeoffs.',
  ].join('\n')
}
