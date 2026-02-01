/**
 * Mock data provider: Contact. Replace with API call later.
 * Email primary. GitHub/LinkedIn placeholders only; do not invent links.
 */

import type { ContactData } from '../types.js'

export function getContact(): ContactData {
  return {
    email: 'contact@example.com',
    location: 'Remote',
    github: undefined,
    linkedin: undefined,
    twitter: undefined,
  }
}
