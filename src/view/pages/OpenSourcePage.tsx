import { memo } from 'react'
import { AsciiHeader } from '../components/AsciiHeader/index.js'
import { ASCII_OPENSOURCE } from '../components/asciiArt.js'
import type { ProjectData } from '../../model/types.js'

export interface OpenSourcePageProps {
  data: ProjectData[]
}

function OpenSourcePageComponent({ data }: OpenSourcePageProps) {
  return (
    <section aria-labelledby="opensource-heading">
      <h2 id="opensource-heading" className="sr-only">
        Open Source
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {data.map((p) => (
          <li key={p.id} style={{ marginBottom: '0.75rem' }}>
            <strong>{p.name}</strong>
            {p.stars !== undefined && p.stars > 0 && (
              <span style={{ color: 'var(--color-text-dim)', marginLeft: '0.5rem' }}>
                ★ {String(p.stars)}
              </span>
            )}
            <br />
            <span style={{ color: 'var(--color-text-dim)' }}>{p.description}</span>
            {p.url && (
              <a href={p.url} style={{ marginLeft: '0.5rem' }}>repo</a>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export const OpenSourcePage = memo(OpenSourcePageComponent)
