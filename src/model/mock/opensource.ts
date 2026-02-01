/**
 * Mock data provider: Open Source contributions. Replace with API call later.
 * Focus: Golang, tooling, infra, developer experience. Minimal, credible.
 */

import type { ProjectData } from '../types.js'

export function getOpenSource(): ProjectData[] {
  return [
    {
      id: 'oss-1',
      name: 'golang/go',
      description: 'Go tooling and stdlib contributions. Code reviews, small fixes.',
      url: 'https://github.com/golang/go',
      stars: 120_000,
    },
    {
      id: 'oss-2',
      name: 'golangci/golangci-lint',
      description: 'Linter plugins and rule improvements. Developer experience.',
      url: 'https://github.com/golangci/golangci-lint',
      stars: 16_000,
    },
  ]
}
