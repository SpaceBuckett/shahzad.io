/**
 * Mock data provider: Projects. Replace with API call later.
 * CV-aligned: real shipped work, domain, stack, impact.
 */

import type { ProjectData } from '../types.js'

export function getProjects(): ProjectData[] {
  return [
    {
      id: 'halalnow',
      name: 'HalalNow',
      description: 'Food delivery. Backend + Mobile. Scale & logistics.',
      url: '#',
      stars: 0,
    },
    {
      id: 'tripmate',
      name: 'TripMate',
      description: 'Travel / logistics. Full-stack, mobile.',
      url: '#',
      stars: 0,
    },
    {
      id: 'pos-edge',
      name: 'POS Edge',
      description: 'POS backend systems. High-throughput, multi-tenant.',
      url: '#',
      stars: 0,
    },
    {
      id: 'auura',
      name: 'Auura',
      description: 'AI immersive app. Real-time, cross-platform.',
      url: '#',
      stars: 0,
    },
    {
      id: 'arete',
      name: 'Arete Studios',
      description: 'Client engineering. Delivery & architecture.',
      url: '#',
      stars: 0,
    },
    {
      id: 'frich',
      name: 'Frich',
      description: 'Gen-Z fintech. 100k+ users. Mobile-first.',
      url: '#',
      stars: 0,
    },
    {
      id: 'costa',
      name: 'Costa Coffee',
      description: 'Production systems. Reliability, observability.',
      url: '#',
      stars: 0,
    },
    {
      id: 'lamma',
      name: 'Lamma',
      description: 'Commerce / logistics. Backend & integrations.',
      url: '#',
      stars: 0,
    },
    {
      id: 'portfolio',
      name: 'Portfolio Terminal',
      description: 'CLI-inspired portfolio. React, TypeScript, MVVM.',
      url: '#',
      stars: 0,
    },
  ]
}
