/**
 * Mock data provider: Contact. Replace with API call later.
 * Email primary. GitHub/LinkedIn placeholders only; do not invent links.
 */

import type { ContactData } from '../types.js'

export function getContact(): ContactData {
  return {
    email: 'iamshahzadahmad.dev@gmail.com',
    location: 'Remote',
    github: 'https://github.com/SpaceBuckett',
    linkedin: 'https://www.linkedin.com/in/heyiamshahzad/',
    twitter: 'https://x.com/ShahzadYam',
  }
}
