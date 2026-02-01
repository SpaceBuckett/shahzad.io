/**
 * Mock data provider: About. Replace with API call later.
 */

import type { AboutData } from '../types.js'

export function getAbout(): AboutData {
  return {
    name: 'Senior Software Engineer',
    tagline: 'Backend (Golang) · Full-stack (Go + React/Next.js) · Mobile (Flutter)',
    bio:
      'One cohesive stack: Go services, REST/event-driven APIs, microservices; React/Next.js and TypeScript on the front; Flutter/Dart for mobile. ' +
      'Open-source contributor. Founder of Astra88 — boutique engineering and research lab for custom AI and emerging tech.',
  }
}
