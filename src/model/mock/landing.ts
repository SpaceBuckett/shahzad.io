/** Responsive landing: different ASCII box widths so lines don’t overflow on small screens. */

const WIDE = [
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

const NARROW = [
  '┌─────────────────────────────────────┐',
  '│       WELCOME TO SHAHZAD.IO         │',
  '└─────────────────────────────────────┘',
  '',
  'Senior Software Engineer',
  'Systems Builder',
  '',
  'Backend · Full-stack · Mobile',
  '',
  'Type `help` to begin.',
].join('\n')

const NARROW_SHORT = [
  '┌───────────────────────┐',
  '│    SHAHZAD.IO         │',
  '└───────────────────────┘',
  '',
  'Software Engineer',
  '',
  'Type `help` to begin.',
].join('\n')

const EXTRA_SHORT = [
  '┌─────────────────┐',
  '│  SHAHZAD.IO     │',
  '└─────────────────┘',
  '',
  'Type `help` to begin.',
].join('\n')

export type LandingVariant = 'wide' | 'narrow' | 'narrowShort' | 'extraShort'

/** Picks landing variant from viewport width so the box fits without horizontal overflow. */
export function getLandingVariant(): LandingVariant {
  if (typeof window === 'undefined') return 'wide'
  const w = window.innerWidth
  if (w < 320) return 'extraShort'
  if (w < 420) return 'narrowShort'
  if (w < 600) return 'narrow'
  return 'wide'
}

export function getLandingContent(variant?: LandingVariant): string {
  const v = variant ?? getLandingVariant()
  if (v === 'extraShort') return EXTRA_SHORT
  if (v === 'narrowShort') return NARROW_SHORT
  if (v === 'narrow') return NARROW
  return WIDE
}
