import { memo } from 'react'
import { AsciiHeader } from '../components/AsciiHeader/index.js'
import { ASCII_PROJECTS } from '../components/asciiArt.js'
import type { ProjectData } from '../../model/types.js'

export interface ProjectsPageProps {
  data: ProjectData[]
}

function ProjectsPageComponent({ data }: ProjectsPageProps) {
  return (
    <section aria-labelledby="projects-heading">
      <AsciiHeader lines={ASCII_PROJECTS} />
      <h2 id="projects-heading" className="sr-only">
        Projects
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
              <a href={p.url} style={{ marginLeft: '0.5rem' }}>link</a>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export const ProjectsPage = memo(ProjectsPageComponent)
