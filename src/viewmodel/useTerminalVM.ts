/**
 * ViewModel: terminal state, command handling, history, autocomplete.
 * No JSX. Used by View (App).
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { HELP_TEXT } from '../model/commands.js'
import {
  CV_FILENAME,
  getArchDiagrams,
  getAstra88Ls,
  getAstra88Readme,
  getAstra88Tree,
  getCvDownloadPath,
  getDesignDoc,
  getEmploymentTreeText,
  getExperienceVerbose,
  getLandingContent,
  getLandingVariant,
  getManShahzad,
  getPrinciplesDoc,
  getProcShahzad,
  getResearchDoc,
  getSkillsStats,
  getSystemsDoc,
  getUnknownCommandMessage,
  getWhoami,
} from '../model/index.js'
import type { SectionId } from '../model/types.js'
import {
  getNextAutocomplete,
  getSingleSuggestion,
  getSuggestions,
  parseCommand,
} from './commandEngine.js'
import {
  getLatencyForParsed,
  getLoadingMessage,
  setLatency,
} from './latency.js'

const MAX_HISTORY = 50

export type OutputLineSemantic = 'system' | 'hint' | 'header' | 'label'

export type OutputLine =
  | { type: 'command'; text: string }
  | { type: 'error'; text: string }
  | { type: 'output'; text: string; semantic?: OutputLineSemantic }

export interface TerminalVMState {
  section: SectionId
  lines: readonly OutputLine[]
  inputValue: string
  /** Set when cv --download runs; View triggers download then clears. */
  pendingCvDownload: string | null
}

const CV_DOWNLOAD_FAILED_MESSAGE =
  '[system] Unable to download CV. Try again later or contact support.'

export interface TerminalVMHandlers {
  setInputValue: (value: string) => void
  handleSubmit: (line: string) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  clearPendingCvDownload: () => void
  /** Call when CV fetch/download fails; appends system error line. */
  reportCvDownloadFailed: () => void
  /** Call when CV download succeeds; appends Done. */
  reportCvDownloadSuccess: () => void
}

export function useTerminalVM(): TerminalVMState & TerminalVMHandlers {
  const [section, setSection] = useState<SectionId>('help')
  const [lines, setLines] = useState<OutputLine[]>(() => [
    { type: 'output', text: getLandingContent(getLandingVariant()) },
  ])
  const [inputValue, setInputValue] = useState('')
  const [pendingCvDownload, setPendingCvDownload] = useState<string | null>(null)
  const historyRef = useRef<string[]>([])
  const historyIndexRef = useRef(-1)
  const autocompleteIndexRef = useRef(-1)
  const astra88ContextRef = useRef(false)
  const hasShown90Ref = useRef(false)

  useEffect(() => {
    const refreshLandingIfOnly = () => {
      setLines((prev) => {
        if (prev.length !== 1 || prev[0].type !== 'output') return prev
        return [{ type: 'output', text: getLandingContent(getLandingVariant()) }]
      })
    }
    refreshLandingIfOnly()
    window.addEventListener('resize', refreshLandingIfOnly)
    return () => window.removeEventListener('resize', refreshLandingIfOnly)
  }, [])

  useEffect(() => {
    if (hasShown90Ref.current) return
    const t = setTimeout(() => {
      hasShown90Ref.current = true
      setLines((prev) => [
        ...prev,
        {
          type: 'output',
          text: '[system] Idle >90s. You\'re still here.',
          semantic: 'system',
        },
      ])
    }, 90_000)
    return () => {
      clearTimeout(t)
    }
  }, [])

  const handleSubmit = useCallback(async (line: string) => {
    const trimmed = line.trim()
    if (trimmed === '') return

    const normalized = trimmed.toLowerCase()
    if (normalized === 'clear') {
      setLines([])
      setSection('help')
      setInputValue('')
      historyIndexRef.current = -1
      autocompleteIndexRef.current = -1
      historyRef.current = [
        trimmed,
        ...historyRef.current.filter((h) => h !== trimmed),
      ].slice(0, MAX_HISTORY)
      return
    }

    setLines((prev) => [...prev, { type: 'command', text: trimmed }])
    const parsed = parseCommand(trimmed)
    const latencyMs = getLatencyForParsed(parsed)
    const loadingMsg = getLoadingMessage(parsed)

    setInputValue('')
    historyIndexRef.current = -1
    autocompleteIndexRef.current = -1
    historyRef.current = [
      trimmed,
      ...historyRef.current.filter((h) => h !== trimmed),
    ].slice(0, MAX_HISTORY)

    if (latencyMs > 0 && loadingMsg) {
      setLines((prev) => [
        ...prev,
        { type: 'output', text: loadingMsg, semantic: 'system' },
      ])
      await setLatency(latencyMs)
    }

    if (astra88ContextRef.current) {
      if (normalized === 'ls') {
        setLines((prev) => [...prev, { type: 'output', text: getAstra88Ls() }])
        setInputValue('')
        historyRef.current = [trimmed, ...historyRef.current.filter((h) => h !== trimmed)].slice(0, MAX_HISTORY)
        return
      }
      if (normalized === 'tree') {
        setLines((prev) => [...prev, { type: 'output', text: getAstra88Tree() }])
        setInputValue('')
        historyRef.current = [trimmed, ...historyRef.current.filter((h) => h !== trimmed)].slice(0, MAX_HISTORY)
        return
      }
      if (normalized === 'cat readme.md' || normalized === 'cat readme') {
        setLines((prev) => [...prev, { type: 'output', text: getAstra88Readme() }])
        setInputValue('')
        historyRef.current = [trimmed, ...historyRef.current.filter((h) => h !== trimmed)].slice(0, MAX_HISTORY)
        return
      }
      if (normalized === 'exit' || normalized === 'cd ..') {
        astra88ContextRef.current = false
        setLines((prev) => [...prev, { type: 'output', text: 'exit' }])
        setInputValue('')
        historyRef.current = [trimmed, ...historyRef.current.filter((h) => h !== trimmed)].slice(0, MAX_HISTORY)
        return
      }
      astra88ContextRef.current = false
    }

    if (parsed.type === 'special') {
      let specialText: string
      if (parsed.key === 'man') {
        specialText = getManShahzad()
      } else if (parsed.key === 'whoami') {
        specialText = getWhoami()
      } else if (parsed.key === 'proc') {
        specialText = getProcShahzad()
      } else if (parsed.key === 'arch') {
        specialText = getArchDiagrams()
      } else if (parsed.key === 'designDoc') {
        specialText = getDesignDoc()
      } else if (parsed.key === 'experienceVerbose') {
        specialText = getExperienceVerbose()
      } else if (parsed.key === 'experienceTimeline') {
        specialText = getEmploymentTreeText()
      } else if (parsed.key === 'systems') {
        specialText = getSystemsDoc()
      } else if (parsed.key === 'principles') {
        specialText = getPrinciplesDoc()
      } else if (parsed.key === 'research') {
        specialText = getResearchDoc()
      } else if (parsed.key === 'cvDownload') {
        setLines((prev) => [
          ...prev,
          { type: 'output', text: `Downloading ${CV_FILENAME}...`, semantic: 'system' },
        ])
        setPendingCvDownload(getCvDownloadPath())
        setInputValue('')
        historyIndexRef.current = -1
        autocompleteIndexRef.current = -1
        historyRef.current = [
          trimmed,
          ...historyRef.current.filter((h) => h !== trimmed),
        ].slice(0, MAX_HISTORY)
        return
      } else {
        const stats = getSkillsStats()
        const labelWidth = Math.max(...stats.map((s) => s.label.length), 10)
        const barMax = 12
        specialText = stats
          .map(
            (s) =>
              `${s.label.padEnd(labelWidth)} ${'█'.repeat(s.barLength)}${'░'.repeat(barMax - s.barLength)} ${s.value}`,
          )
          .join('\n')
      }
      setLines((prev) => [...prev, { type: 'output', text: specialText }])
    } else if (parsed.type === 'known') {
      setSection(parsed.command)
      if (parsed.command === 'help') {
        setLines((prev) => [...prev, { type: 'output', text: HELP_TEXT }])
      } else if (parsed.command === 'astra88') {
        astra88ContextRef.current = true
        setLines((prev) => [
          ...prev,
          { type: 'output', text: `→ astra88 (ls, tree, cat README.md, exit)` },
        ])
      } else {
        setLines((prev) => [
          ...prev,
          { type: 'output', text: `→ ${parsed.command}` },
        ])
      }
    } else {
      setLines((prev) => [
        ...prev,
        { type: 'error', text: getUnknownCommandMessage(parsed.input) },
      ])
    }
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const history = historyRef.current
      const input = e.currentTarget.value

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (history.length === 0) return
        const idx = historyIndexRef.current < history.length - 1
          ? historyIndexRef.current + 1
          : history.length - 1
        historyIndexRef.current = idx
        setInputValue(history[idx] ?? '')
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (historyIndexRef.current <= 0) {
          historyIndexRef.current = -1
          setInputValue('')
          return
        }
        historyIndexRef.current -= 1
        const prev = history[historyIndexRef.current]
        setInputValue(prev)
        return
      }

      if (e.key === 'Tab') {
        e.preventDefault()
        const suggestions = getSuggestions(input)
        if (suggestions.length === 0) return
        const single = getSingleSuggestion(input)
        if (single) {
          setInputValue(single)
          autocompleteIndexRef.current = -1
          return
        }
        const next = getNextAutocomplete(
          input,
          suggestions,
          autocompleteIndexRef.current,
        )
        if (next) {
          autocompleteIndexRef.current =
            (autocompleteIndexRef.current + 1) % suggestions.length
          setInputValue(next)
        }
      }
    },
    [],
  )

  const clearPendingCvDownload = useCallback(() => {
    setPendingCvDownload(null)
  }, [])

  const reportCvDownloadFailed = useCallback(() => {
    setLines((prev) => [
      ...prev,
      { type: 'output', text: CV_DOWNLOAD_FAILED_MESSAGE, semantic: 'system' },
    ])
  }, [])

  const reportCvDownloadSuccess = useCallback(() => {
    setLines((prev) => [
      ...prev,
      { type: 'output', text: 'Done.', semantic: 'system' },
    ])
  }, [])

  return {
    section,
    lines,
    inputValue,
    pendingCvDownload,
    setInputValue,
    handleSubmit,
    handleKeyDown,
    clearPendingCvDownload,
    reportCvDownloadFailed,
    reportCvDownloadSuccess,
  }
}
