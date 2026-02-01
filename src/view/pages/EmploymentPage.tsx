import { memo } from 'react'
import { AsciiHeader } from '../components/AsciiHeader/index.js'
import { ASCII_EMPLOYMENT } from '../components/asciiArt.js'
import type { EmploymentEntry } from '../../model/types.js'

export interface EmploymentPageProps {
  data: EmploymentEntry[]
  treeText: string
}

function EmploymentPageComponent({ data: _data, treeText }: EmploymentPageProps) {
  return (
    <section aria-labelledby="employment-heading">
      <AsciiHeader lines={ASCII_EMPLOYMENT} />
      <h2 id="employment-heading" className="sr-only">
        Employment
      </h2>
      <pre
        style={{
          margin: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8125rem',
          lineHeight: 1.4,
          color: 'var(--color-terminal-header)',
          whiteSpace: 'pre',
          overflowX: 'auto',
        }}
        aria-hidden
      >
        {treeText}
      </pre>
    </section>
  )
}

export const EmploymentPage = memo(EmploymentPageComponent)
