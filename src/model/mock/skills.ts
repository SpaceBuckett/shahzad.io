/**
 * Mock data provider: Skills. Replace with API call later.
 */

import type { SkillGroup } from '../types.js'

export interface SkillStat {
  label: string
  value: string
  /** Bar length 1–12 for ASCII bar. Scale consistent. */
  barLength: number
}

export function getSkillsStats(): SkillStat[] {
  return [
    { label: 'Golang', value: '99.98% uptime', barLength: 12 },
    { label: 'Flutter', value: '100K+ users shipped', barLength: 10 },
    { label: 'React', value: '60% latency reduced', barLength: 9 },
    { label: 'Kubernetes', value: 'multi-env prod', barLength: 8 },
  ]
}

export function getSkills(): SkillGroup[] {
  return [
    {
      name: 'Backend',
      items: [
        'Golang',
        'REST APIs',
        'Event-driven systems',
        'Microservices',
        'Protobuf',
        'Kafka / PubSub',
        'PostgreSQL',
        'Redis',
        'Firebase',
      ],
    },
    {
      name: 'Frontend / Fullstack',
      items: [
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind',
        'State management (Redux/Zustand)',
      ],
    },
    {
      name: 'Mobile',
      items: [
        'Flutter',
        'Dart',
        'Android/iOS platform channels',
        'Animations',
        'Deep linking',
        'Maps & real-time updates',
      ],
    },
    {
      name: 'DevOps / Cloud',
      items: [
        'Docker',
        'Kubernetes',
        'AWS',
        'GCP',
        'CI/CD (GitHub Actions, Jenkins, CodeMagic)',
        'Helm',
      ],
    },
    {
      name: 'Observability & Quality',
      items: [
        'Prometheus',
        'Grafana',
        'ELK',
        'Unit / Integration testing',
        'Benchmarks',
        'Profiling (pprof, go tool trace)',
      ],
    },
    {
      name: 'System Design',
      items: ['C4 diagrams', 'Architecture docs', 'Design reviews', 'Mentorship'],
    },
  ]
}
