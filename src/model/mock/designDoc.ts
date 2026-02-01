/**
 * Mock data: hidden design doc for `design --doc`. NOT in help.
 * Engineering principles, system design philosophy, tradeoffs.
 * Calm, senior, honest. No buzzwords. For interviewers.
 */

export function getDesignDoc(): string {
  return [
    'DESIGN DOC',
    '──────────',
    '',
    'Principles',
    '  • Simplicity over cleverness. Readable code outlives smart code.',
    '  • Data shapes the design. Get the model right first.',
    '  • Fail fast, fail clearly. Errors should be actionable.',
    '  • Prefer composition. Small, testable units.',
    '',
    'System design',
    '  • Backend: stateless services, persistence at the edges. Event-driven where ordering matters.',
    '  • Frontend: single source of truth. Minimal re-renders.',
    '  • Mobile: platform channels for native; keep business logic in Dart.',
    '',
    'Tradeoffs',
    '  • This portfolio: MVVM, no router. Commands drive state. Easy to reason about, easy to swap data later.',
    '  • No SSR: static content, fast first load. When content becomes dynamic, add API layer; View stays dumb.',
    '',
    'Why these decisions',
    '  • Terminal UX: engineers expect affordances (clear, man, help). They signal seriousness.',
    '  • ASCII over charts: universal, copy-pasteable, no asset pipeline.',
    '  • Hidden commands: reward exploration. design --doc is for people who look.',
  ].join('\n')
}
