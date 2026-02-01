import { lazy, memo, Suspense } from 'react'
import { AsciiHeader } from '../components/AsciiHeader/index.js'
import { ASCII_ABOUT } from '../components/asciiArt.js'
import type { AboutData } from '../../model/types.js'

const AsciiPortrait = lazy(() =>
  import('../components/AsciiPortrait/index.js').then((m) => ({ default: m.AsciiPortrait })),
)

export interface AboutPageProps {
  data: AboutData
}

function AboutPageComponent({ data }: AboutPageProps) {
  return (
    <section aria-labelledby="about-heading">
      <AsciiHeader lines={ASCII_ABOUT} />
      <h2 id="about-heading" className="sr-only">
        About
      </h2>
      <Suspense fallback={null}>
        <AsciiPortrait />
      </Suspense>
      <p style={{ margin: 0 }}>{data.name} — {data.tagline}</p>
      <p style={{ marginTop: '0.5rem' }}>{data.bio}</p>
    </section>
  )
}

export const AboutPage = memo(AboutPageComponent)
