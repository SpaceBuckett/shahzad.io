import { memo } from 'react'
import { AsciiHeader } from '../components/AsciiHeader/index.js'
import { ASCII_SKILLS } from '../components/asciiArt.js'
import type { SkillGroup } from '../../model/types.js'

export interface SkillsPageProps {
  data: SkillGroup[]
}

function SkillsPageComponent({ data }: SkillsPageProps) {
  return (
    <section aria-labelledby="skills-heading">
      <AsciiHeader lines={ASCII_SKILLS} />
      <h2 id="skills-heading" className="sr-only">
        Skills
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {data.map((g) => (
          <li key={g.name} style={{ marginBottom: '0.75rem' }}>
            <strong style={{ color: 'var(--color-terminal-header)' }}>{g.name}</strong>
            <span style={{ color: 'var(--color-text-dim)' }}>: {g.items.join(', ')}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export const SkillsPage = memo(SkillsPageComponent)
