/**
 * Format date range for display (e.g. MMM YYYY – MMM YYYY or Present).
 */

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

/** Parse YYYY-MM to { year, monthIndex }. */
function parseYYYYMM(s: string | undefined): { year: number; month: number } | null {
  if (!s || s.toLowerCase() === 'present') return null
  const [y, m] = s.split('-').map(Number)
  if (Number.isNaN(y) || Number.isNaN(m) || m < 1 || m > 12) return null
  return { year: y, month: m }
}

/**
 * Format start and end (YYYY-MM or 'present') as "MMM YYYY – MMM YYYY" or "MMM YYYY – Present".
 */
export function formatPeriod(start: string | undefined, end: string | undefined): string {
  const startParsed = parseYYYYMM(start)
  const endIsPresent = !end || end.toLowerCase() === 'present'
  const endParsed = endIsPresent ? null : parseYYYYMM(end)

  const startStr = startParsed
    ? `${MONTHS[startParsed.month - 1]} ${startParsed.year}`
    : '—'
  const endStr = endIsPresent ? 'Present' : (endParsed ? `${MONTHS[endParsed.month - 1]} ${endParsed.year}` : '—')

  return `${startStr} – ${endStr}`
}
