/**
 * Mock data: main page / first impression. Replace with API later.
 * UNIX manual cover. Minimal. Confident. No redundant identity.
 */

export function getLandingContent(): string {
  return [
    // make this elegant and professional with borders
    '┌────────────────────────────────────────────────────────────────────────────┐',
    '│                         WELCOME TO SHAHZAD.IO                              │',
    '└────────────────────────────────────────────────────────────────────────────┘',
    '',
    'Senior Software Engineer · Systems Builder',
    '',
    'Backend · Full-stack · Mobile · Research',
    '',
    'Type `help` to begin.',
  ].join('\n')
}
