/**
 * Mock data provider: About. Replace with API call later.
 */

import type { AboutData } from '../types.js'

export function getAbout(): AboutData {
  return {
    name: 'Shahzad Ahmad',
    tagline: 'Senior Software Engineer | Full-Stack (Golang, React/Next.js, Flutter) | Cloud Architect',
    bio:
      'I am a performance-driven Senior Software Engineer with over 5 years of experience architecting and building scalable, high-performance systems. ' +
      'From backend microservices with Golang to SEO-optimized frontend applications using Next.js, I am skilled in creating end-to-end solutions that are efficient, maintainable, and robust. ' +
      'As a passionate open-source contributor and the founder of Astra88, a boutique research and engineering lab, I specialize in emerging technologies, AI, and cloud infrastructure. ' +
      'My focus lies in optimizing systems for speed, scalability, and reliability, utilizing modern cloud platforms, Docker, Kubernetes, and CI/CD pipelines to ensure seamless delivery. ' +
      'When not coding, I am mentoring developers and designing systems with a keen eye on future-proof architecture and sustainable engineering practices.'
  }
}
