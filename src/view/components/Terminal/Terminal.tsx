import { memo, useEffect, useRef } from 'react'
import styles from './Terminal.module.css'

export interface TerminalProps {
  /** Content above the prompt (output / command history) */
  children: React.ReactNode
  /** Prompt string (e.g. "~ $ ") */
  prompt?: string
  /** Current input value (controlled) */
  inputValue?: string
  /** Placeholder when input is empty */
  inputPlaceholder?: string
  /** Whether the input row is visible */
  showInput?: boolean
  /** Callback when user submits (Enter) */
  onSubmit?: (line: string) => void
  /** Callback when input changes (for controlled input) */
  onInputChange?: (value: string) => void
  /** Callback for key down (history, autocomplete). Called before Enter handling. */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  /** Accessibility: label for the input */
  inputLabel?: string
  /** When this value changes, the output area scrolls to the bottom (e.g. lines.length) */
  scrollToBottomTrigger?: number
}

function TerminalComponent({
  children,
  prompt = '~ $ ',
  inputValue = '',
  inputPlaceholder = 'type a command...',
  showInput = true,
  onSubmit,
  onInputChange,
  onKeyDown,
  inputLabel = 'Command input',
  scrollToBottomTrigger,
}: TerminalProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (scrollToBottomTrigger === undefined) return
    outputRef.current?.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [scrollToBottomTrigger])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e)
    if (e.key === 'Enter' && !e.defaultPrevented) {
      e.preventDefault()
      const value = e.currentTarget.value.trim()
      if (value) onSubmit?.(value)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange?.(e.target.value)
  }

  return (
    <div className={styles.shell} role="application" aria-label="Terminal">
      <header className={styles.header} aria-hidden>
        <span className={`${styles.dot} ${styles.dotRed}`} />
        <span className={`${styles.dot} ${styles.dotYellow}`} />
        <span className={`${styles.dot} ${styles.dotGreen}`} />
        <span className={styles.title}>terminal</span>
      </header>
      <div ref={outputRef} className={styles.output} role="log" aria-live="polite">
        {children}
      </div>
      {showInput && (
        <div className={styles.promptLine}>
          <span className={styles.prompt} aria-hidden>
            {prompt}
          </span>
          <div className={styles.inputWrapper}>
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              value={inputValue}
              placeholder={inputPlaceholder}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              aria-label={inputLabel}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <span className={styles.caret} aria-hidden />
          </div>
        </div>
      )}
    </div>
  )
}

export const Terminal = memo(TerminalComponent)
