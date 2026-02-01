import { memo, useCallback, useEffect, useState } from 'react'
import styles from './BootScreen.module.css'

const BOOT_LINES = [
  '[  OK  ] Starting system...',
  '[  OK  ] Loading modules...',
  '[  OK  ] Initializing terminal...',
  '[  OK  ] Mounting portfolio...',
  '',
  'Welcome. Type `help` for commands.',
  '',
]

export interface BootScreenProps {
  onComplete: () => void
  skipLabel?: string
}

function BootScreenComponent({
  onComplete,
  skipLabel = 'Skip (click or press any key)',
}: BootScreenProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [skipped, setSkipped] = useState(false)

  const finishBoot = useCallback(() => {
    setSkipped(true)
    setDisplayedLines([...BOOT_LINES])
    onComplete()
  }, [onComplete])

  useEffect(() => {
    if (skipped) return
    setDisplayedLines([...BOOT_LINES])
    const t = requestAnimationFrame(() => {
      onComplete()
    })
    return () => cancelAnimationFrame(t)
  }, [skipped])

  const handleSkip = useCallback(() => {
    if (skipped) return
    finishBoot()
  }, [finishBoot, skipped])

  useEffect(() => {
    const onKey = () => handleSkip()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleSkip])

  return (
    <div className={styles.shell} role="log" aria-live="polite" aria-label="Boot sequence">
      {displayedLines.map((line, i) => (
        <p key={String(i)} className={styles.line}>
          {line}
        </p>
      ))}
      {!skipped && (
        <p className={styles.skip}>
          <button
            type="button"
            className={styles.skipButton}
            onClick={handleSkip}
            aria-label="Skip boot sequence"
          >
            {skipLabel}
          </button>
        </p>
      )}
    </div>
  )
}

export const BootScreen = memo(BootScreenComponent)
