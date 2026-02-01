import { memo } from 'react'
import { useTypingReveal } from '../../hooks/useTypingReveal.js'
import styles from './AsciiHeader.module.css'

export interface AsciiHeaderProps {
  /** ASCII art lines (one string or array of lines) */
  lines: string | readonly string[]
  /** Optional className */
  className?: string
  /** When true, reveal lines one-by-one (typing effect). Respects reduced-motion. */
  animate?: boolean
}

function AsciiHeaderComponent({
  lines,
  className = '',
  animate = false,
}: AsciiHeaderProps) {
  const lineArray = typeof lines === 'string' ? [lines] : [...lines]
  const visibleCount = useTypingReveal(lineArray, animate ? 100 : 0)
  const text = lineArray.slice(0, visibleCount).join('\n')
  return (
    <pre className={`${styles.header} ${className}`.trim()} aria-hidden>
      {text}
    </pre>
  )
}

export const AsciiHeader = memo(AsciiHeaderComponent)
