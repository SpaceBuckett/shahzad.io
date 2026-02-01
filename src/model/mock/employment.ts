/**
 * Mock data provider: Employment. Replace with API call later.
 * Chronological: most recent first. Bullets and impact in description.
 */

import type { EmploymentEntry } from '../types.js'

/** ASCII tree showing overlapping timelines. Employment vs venture clear. */
export function getEmploymentTreeText(): string {
  return [
    '2023 ─────────────────────────────────────────────────────────',
    '├─ AntonX (Senior Software Engineer)',
    '│  ├─ Backend (Golang, Microservices)',
    '│  ├─ Fullstack (Go + React/Next.js)',
    '│  └─ Mobile (Flutter)',
    '│',
    '└─ Astra88 (Founder) [alongside AntonX]',
    '   ├─ Boutique engineering studio',
    '   └─ Research lab',
    '',
    '2021 ─────────────────────────────────────────────────────────',
    '├─ AntonX (Senior Software Engineer)',
    '├─ Astra88 (Founder)',
    '└─ NOW by HMC (Backend & Mobile Systems)',
    '',
    '2019 ─────────────────────────────────────────────────────────',
    '├─ UToR Digital (Senior Flutter Engineer)',
    '└─ Astra88 (Founder)',
    '',
    '2018 ─────────────────────────────────────────────────────────',
    '└─ Upwork (Freelance Engineer)',
  ].join('\n')
}

export function getEmployment(): EmploymentEntry[] {
  return [
    {
      id: 'e1',
      role: 'Senior Software Engineer (Backend / Fullstack / Mobile)',
      company: 'AntonX',
      period: '2023 – Present',
      description:
        'Go services, REST/event-driven APIs, microservices. React/Next.js and Flutter apps. ' +
        'Reduced p99 latency 40%. Led design reviews and mentorship.',
    },
    {
      id: 'e2',
      role: 'Backend & Mobile Systems',
      company: 'NOW by HMC',
      period: '2021 – 2023',
      description:
        'Golang backend, PostgreSQL, Redis, Kafka. Flutter mobile apps, deep linking, maps, real-time updates. ' +
        'Improved uptime to 99.9%. Cross-platform delivery.',
    },
    {
      id: 'e3',
      role: 'Senior Flutter Engineer',
      company: 'UToR Digital',
      period: '2019 – 2021',
      description:
        'Flutter/Dart, Android/iOS platform channels, animations. Shipped apps to production; CI/CD (CodeMagic). ' +
        'Scaled to 100k+ users.',
    },
    {
      id: 'e4',
      role: 'Freelance Engineer',
      company: 'Upwork',
      period: '2018 – 2019',
      description:
        'Full-stack and mobile contracts. Golang backends, React frontends, Flutter prototypes. Client delivery and scope.',
    },
  ]
}
