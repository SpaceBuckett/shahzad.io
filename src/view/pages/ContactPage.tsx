import { memo } from 'react'
import { AsciiHeader } from '../components/AsciiHeader/index.js'
import { ASCII_CONTACT } from '../components/asciiArt.js'
import type { ContactData } from '../../model/types.js'

export interface ContactPageProps {
  data: ContactData
}

function ContactPageComponent({ data }: ContactPageProps) {
  return (
    <section aria-labelledby="contact-heading">
      <AsciiHeader lines={ASCII_CONTACT} />
      <h2 id="contact-heading" className="sr-only">
        Contact
      </h2>
      <p style={{ margin: 0 }}>
        <a href={`mailto:${data.email}`}>{data.email}</a>
      </p>
      {data.github && (
        <p style={{ margin: '0.5rem 0 0' }}>
          <a href={data.github}>GitHub</a>
        </p>
      )}
      {data.linkedin && (
        <p style={{ margin: '0.25rem 0 0' }}>
          <a href={data.linkedin}>LinkedIn</a>
        </p>
      )}
      {data.twitter && (
        <p style={{ margin: '0.25rem 0 0' }}>
          <a href={data.twitter}>Twitter</a>
        </p>
      )}
    </section>
  )
}

export const ContactPage = memo(ContactPageComponent)
