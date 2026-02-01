import App from './App.tsx'
import { KNOWN_COMMANDS } from './model/commands.js'
import { NotFoundPage } from './view/pages/NotFoundPage.js'

const ROOT_PATHS = ['/', '', '/index.html']

export function AppRoot() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isRoot = ROOT_PATHS.includes(path)
  if (isRoot) return <App />
  return (
    <NotFoundPage
      suggestions={KNOWN_COMMANDS.filter((c) => c !== 'help')}
    />
  )
}
