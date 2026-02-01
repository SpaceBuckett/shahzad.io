/**
 * ViewModel: easter-egg trigger (Konami code). No JSX.
 */

import { useCallback, useEffect, useRef, useState } from 'react'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
] as const

export function useEasterEgg(): { triggered: boolean; dismiss: () => void } {
  const [triggered, setTriggered] = useState(false)
  const indexRef = useRef(0)

  const dismiss = useCallback(() => {
    setTriggered(false)
    indexRef.current = 0
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (triggered) return
      const idx = indexRef.current
      if (idx >= KONAMI.length) return
      const want = KONAMI[idx]
      if (e.code === want) {
        indexRef.current += 1
        if (indexRef.current >= KONAMI.length) {
          setTriggered(true)
          indexRef.current = 0
        }
      } else {
        indexRef.current = 0
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [triggered])

  return { triggered, dismiss }
}
