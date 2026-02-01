import { memo } from 'react'
import styles from './NotFoundPage.module.css'

const ASCII_404 = [
  ' ___  ___  ___   ___  ___ ',
  '| __|| _ \\| __| | _ \\|_ _|',
  '| _| |   /| _|  |  _/ | | ',
  '|___|_|_\\_|___| |_|  |___|',
]

export interface NotFoundPageProps {
  /** Suggested commands to try */
  suggestions?: readonly string[]
}

function NotFoundPageComponent({
  suggestions = ['help', 'about', 'projects', 'contact'],
}: NotFoundPageProps) {
  return (
    <div className={styles.shell} role="alert">
      <pre className={styles.ascii} aria-hidden>
        {ASCII_404.join('\n')}
      </pre>
      <h1 className={styles.title}>Not found</h1>
      <p className={styles.message}>
        The path you requested does not exist. Try one of these commands:
      </p>
      <ul className={styles.commands}>
        {suggestions.map((cmd) => (
          <li key={cmd}>
            <a href="/" className={styles.link}>
              {cmd}
            </a>
          </li>
        ))}
      </ul>
      <p className={styles.hint}>
        <a href="/">Go home</a>
      </p>
    </div>
  )
}

export const NotFoundPage = memo(NotFoundPageComponent)
