/**
 * Mock data: fake /proc-style output for `cat /proc/shahzad`. Replace with API later.
 */

export function getProcShahzad(): string {
  return [
    'role: Senior Software Engineer',
    'stack: Golang | React/Next.js | Flutter',
    'uptime: 24/7',
    'load_avg: 0.42 0.38 0.35',
    'threads: 1',
    'context_switches: 0',
    'voluntary: yes',
  ].join('\n')
}
