/**
 * Line-by-line typing reveal for ASCII headers. Respects reduced-motion.
 */

import { useEffect, useState } from 'react'

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Returns the number of lines to show, incrementing over time for a typing effect.
 * If reduced-motion is preferred, returns lines.length immediately.
 */
export function useTypingReveal(
  lines: readonly string[],
  intervalMs: number = 90,
): number {
  const [visibleCount, setVisibleCount] = useState(() =>
    intervalMs <= 0 || (typeof window !== 'undefined' && prefersReducedMotion())
      ? lines.length
      : 0,
  )

  useEffect(() => {
    if (
      prefersReducedMotion() ||
      lines.length === 0 ||
      intervalMs <= 0
    ) {
      setVisibleCount(lines.length)
      return
    }
    setVisibleCount(0)
    const id = setInterval(() => {
      setVisibleCount((c) => {
        if (c >= lines.length) {
          clearInterval(id)
          return c
        }
        return c + 1
      })
    }, intervalMs)
    return () => clearInterval(id)
  }, [lines, intervalMs])

  return prefersReducedMotion() ? lines.length : visibleCount
}
