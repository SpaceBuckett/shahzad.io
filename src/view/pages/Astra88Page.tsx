import { memo } from 'react'
import { AsciiHeader } from '../components/AsciiHeader/index.js'
import { ASCII_ASTRA88 } from '../components/asciiArt.js'
import type { Astra88Data } from '../../model/types.js'

export interface Astra88PageProps {
  data: Astra88Data
}

function Astra88PageComponent({ data }: Astra88PageProps) {
  return (
    <section aria-labelledby="astra88-heading">
      <AsciiHeader lines={ASCII_ASTRA88} />
      <h2 id="astra88-heading" className="sr-only">
        Astra88
      </h2>
      <p style={{ margin: 0 }}><strong>{data.tagline}</strong></p>
      <p style={{ marginTop: '0.5rem' }}>{data.description}</p>
      <ul style={{ marginTop: '0.75rem' }}>
        {data.offerings.map((o, i) => (
          <li key={String(i)}>{o}</li>
        ))}
      </ul>
    </section>
  )
}

export const Astra88Page = memo(Astra88PageComponent)
