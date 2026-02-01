import { lazy, memo, Suspense, useEffect, useState } from 'react'
import {
  CV_FILENAME,
  getAbout,
  getAstra88,
  getContact,
  getEmployment,
  getEmploymentTreeText,
  getOpenSource,
  getProjects,
  getSkills,
} from './model/index.js'
import type { SectionId } from './model/types.js'
import { useEasterEgg, useTerminalVM } from './viewmodel/index.js'
import type { OutputLine } from './viewmodel/index.js'
import { BootScreen } from './view/components/BootScreen/index.js'
import { EasterEggOverlay } from './view/components/EasterEggOverlay/index.js'
import { Terminal } from './view/components/Terminal/index.js'

const AboutPage = lazy(() =>
  import('./view/pages/AboutPage.js').then((m) => ({ default: m.AboutPage })),
)
const ProjectsPage = lazy(() =>
  import('./view/pages/ProjectsPage.js').then((m) => ({ default: m.ProjectsPage })),
)
const OpenSourcePage = lazy(() =>
  import('./view/pages/OpenSourcePage.js').then((m) => ({ default: m.OpenSourcePage })),
)
const EmploymentPage = lazy(() =>
  import('./view/pages/EmploymentPage.js').then((m) => ({ default: m.EmploymentPage })),
)
const Astra88Page = lazy(() =>
  import('./view/pages/Astra88Page.js').then((m) => ({ default: m.Astra88Page })),
)
const ContactPage = lazy(() =>
  import('./view/pages/ContactPage.js').then((m) => ({ default: m.ContactPage })),
)
const SkillsPage = lazy(() =>
  import('./view/pages/SkillsPage.js').then((m) => ({ default: m.SkillsPage })),
)

function renderOutputLine(line: OutputLine): React.ReactNode {
  if (line.type === 'command') {
    return (
      <div style={{ color: 'var(--color-terminal-header)' }}>{`$ ${line.text}`}</div>
    )
  }
  if (line.type === 'error') {
    return (
      <div style={{ color: 'var(--color-terminal-error)' }}>{line.text}</div>
    )
  }
  const semantic = line.semantic ?? 'default'
  const color =
    semantic === 'system'
      ? 'var(--color-terminal-system)'
      : semantic === 'hint'
        ? 'var(--color-terminal-hint)'
        : semantic === 'header'
          ? 'var(--color-terminal-header)'
          : semantic === 'label'
            ? 'var(--color-terminal-label)'
            : undefined
  return (
    <div
      style={{
        whiteSpace: 'pre-wrap',
        ...(color ? { color } : {}),
      }}
    >
      {line.text}
    </div>
  )
}

const SectionContent = memo(function SectionContent({ section }: { section: SectionId }) {
  if (section === 'help') return null
  return (
    <Suspense fallback={<div style={{ color: 'var(--color-text-dim)' }}>loading...</div>}>
      {section === 'about' && <AboutPage data={getAbout()} />}
      {section === 'skills' && <SkillsPage data={getSkills()} />}
      {section === 'projects' && <ProjectsPage data={getProjects()} />}
      {section === 'opensource' && <OpenSourcePage data={getOpenSource()} />}
      {section === 'experience' && (
        <EmploymentPage
          data={getEmployment()}
          treeText={getEmploymentTreeText()}
        />
      )}
      {section === 'astra88' && <Astra88Page data={getAstra88()} />}
      {section === 'contact' && <ContactPage data={getContact()} />}
    </Suspense>
  )
})

function App() {
  const [bootDone, setBootDone] = useState(false)
  const vm = useTerminalVM()
  const { triggered: eggTriggered, dismiss: dismissEgg } = useEasterEgg()

  const {
    pendingCvDownload,
    clearPendingCvDownload,
    reportCvDownloadFailed,
    reportCvDownloadSuccess,
  } = vm
  useEffect(() => {
    if (!pendingCvDownload) return
    const url = pendingCvDownload
    const controller = new AbortController()
    fetch(url, { signal: controller.signal })
      .then((res) => {
        const ct = res.headers.get('content-type') ?? ''
        if (!res.ok || !ct.toLowerCase().includes('application/pdf')) {
          reportCvDownloadFailed()
          clearPendingCvDownload()
          return
        }
        return res.blob()
      })
      .then((blob) => {
        if (!blob) return
        const href = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = href
        a.download = CV_FILENAME
        a.rel = 'noopener noreferrer'
        a.click()
        URL.revokeObjectURL(href)
        reportCvDownloadSuccess()
        clearPendingCvDownload()
      })
      .catch(() => {
        reportCvDownloadFailed()
        clearPendingCvDownload()
      })
    return () => controller.abort()
  }, [
    pendingCvDownload,
    clearPendingCvDownload,
    reportCvDownloadFailed,
    reportCvDownloadSuccess,
  ])

  if (!bootDone) {
    return <BootScreen onComplete={() => { setBootDone(true) }} />
  }

  return (
    <>
      {eggTriggered && (
        <EasterEggOverlay visible onDismiss={dismissEgg} />
      )}
      <div className="appBackground" aria-hidden />
      <Terminal
        prompt="~ $ "
        inputValue={vm.inputValue}
        inputPlaceholder="type a command (e.g. help)"
        showInput
        onInputChange={vm.setInputValue}
        onSubmit={vm.handleSubmit}
        onKeyDown={vm.handleKeyDown}
        scrollToBottomTrigger={vm.lines.length}
        scrollOutput={vm.section !== 'about'}
      >
        <>
          {vm.lines.map((line, i) => (
            <div key={`${String(i)}-${line.text.slice(0, 20)}`}>{renderOutputLine(line)}</div>
          ))}
          <SectionContent section={vm.section} />
        </>
      </Terminal>
    </>
  )
}

export default App
