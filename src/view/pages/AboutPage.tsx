import { memo } from 'react'
import { AsciiHeader } from '../components/AsciiHeader/index.js'
import { ASCII_ABOUT } from '../components/asciiArt.js'
import type { AboutData } from '../../model/types.js'

export interface AboutPageProps {
  data: AboutData
}

function AboutPageComponent({ data }: AboutPageProps) {
  return (
    <section aria-labelledby="about-heading">
      <h2 id="about-heading" className="sr-only">
        About
      </h2>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-terminal-header)' }}>
        {data.name}
      </p>
      <p style={{ margin: '0.35rem 0 0', color: 'var(--color-text-dim)', fontSize: '0.875rem' }}>
        {data.tagline}
      </p>
      <p style={{ margin: '0.75rem 0 0', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
        {data.bio}
      </p>
    </section>
  )
}

export const AboutPage = memo(AboutPageComponent)
