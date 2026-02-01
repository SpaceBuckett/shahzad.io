import { memo } from 'react'
import { AsciiHeader } from '../components/AsciiHeader/index.js'
import { ASCII_EMPLOYMENT } from '../components/asciiArt.js'
import type { EmploymentEntry } from '../../model/types.js'
import styles from './EmploymentPage.module.css'

export interface EmploymentPageProps {
  data: EmploymentEntry[]
  treeText: string
}

function EmploymentPageComponent({ data, treeText }: EmploymentPageProps) {
  return (
    <section className={styles.section} aria-labelledby="employment-heading">
      <AsciiHeader lines={ASCII_EMPLOYMENT} />
      <h2 id="employment-heading" className="sr-only">
        Experience
      </h2>

      <div className={styles.treeBlock}>
        <pre className={styles.tree} aria-hidden>
          {treeText}
        </pre>
      </div>

      <ul className={styles.timeline} aria-label="Experience timeline">
        {data.map((entry) => (
          <li key={entry.id} className={styles.card}>
            <div className={styles.company}>{entry.company}</div>
            <div className={styles.role}>{entry.role}</div>
            <div className={styles.meta}>
              <span>{entry.period}</span>
              {entry.employmentType && <span>{entry.employmentType}</span>}
              {entry.location && <span>{entry.location}</span>}
            </div>
            {entry.description && (
              <p className={styles.description}>{entry.description}</p>
            )}
            {entry.highlights && entry.highlights.length > 0 && (
              <ul className={styles.highlights}>
                {entry.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export const EmploymentPage = memo(EmploymentPageComponent)
