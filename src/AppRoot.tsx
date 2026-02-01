import App from './App.tsx'
import { KNOWN_COMMANDS } from './model/commands.js'
import { NotFoundPage } from './view/pages/NotFoundPage.js'

const ROOT_PATHS = ['/', '', '/index.html']

export function AppRoot() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  const base = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '/'
  const baseNorm = base.replace(/\/$/, '') || '/'
  const isRoot =
    ROOT_PATHS.includes(path) ||
    path === baseNorm ||
    path === `${baseNorm}/` ||
    path === `${base}index.html`
  if (isRoot) return <App />
  return (
    <NotFoundPage
      suggestions={KNOWN_COMMANDS.filter((c) => c !== 'help')}
    />
  )
}
