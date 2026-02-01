import { memo } from 'react'
import styles from './AsciiPortrait.module.css'

/** ASCII developer portrait – lazy-loaded, text-only. */
const PORTRAIT = [
  '     .--------.     ',
  '    /   ____   \\    ',
  '   |  ( o  o )  |   ',
  '   |   \\ __ /   |   ',
  '    \\__________/    ',
  '   /  |  \\/  |  \\   ',
  '  |   |      |   |  ',
  '  |   | code |   |  ',
  '  |   |______|   |  ',
  '   \\_/        \\_/   ',
]

function AsciiPortraitComponent() {
  return (
    <pre className={styles.portrait} aria-hidden>
      {PORTRAIT.join('\n')}
    </pre>
  )
}

export const AsciiPortrait = memo(AsciiPortraitComponent)
