import { memo, useCallback, useEffect } from 'react'
import styles from './EasterEggOverlay.module.css'

const EGG_ART = [
  '  +----------------+',
  '  | You found it.  |',
  '  |   +------+     |',
  '  |   |  ^^  |     |',
  '  |   +------+     |',
  '  +----------------+',
]

export interface EasterEggOverlayProps {
  visible: boolean
  onDismiss: () => void
}

function EasterEggOverlayComponent({ visible, onDismiss }: EasterEggOverlayProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss],
  )

  useEffect(() => {
    if (!visible) return
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [visible, handleKeyDown])

  if (!visible) return null

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-label="Easter egg"
      onClick={onDismiss}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onDismiss()
      }}
    >
      <div
        className={styles.box}
        role="document"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <pre className={styles.art} aria-hidden>
          {EGG_ART.join('\n')}
        </pre>
        <p style={{ margin: 0 }}>Reward: you&apos;re curious. That counts.</p>
        <p className={styles.hint}>Click outside or press Escape to close</p>
      </div>
    </div>
  )
}

export const EasterEggOverlay = memo(EasterEggOverlayComponent)
