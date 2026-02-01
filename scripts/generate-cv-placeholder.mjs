/**
 * Generates a minimal valid PDF placeholder for CV download.
 * Run: node scripts/generate-cv-placeholder.mjs
 * Output: public/shahzad_ahmad_cv.pdf
 */

import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { PDFDocument, StandardFonts } from 'pdf-lib'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '..', 'public', 'shahzad_ahmad_cv.pdf')

async function main() {
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const page = doc.addPage([612, 792])

  page.drawText('Shahzad Ahmad', { x: 100, y: 720, size: 24, font })
  page.drawText('Senior Software Engineer', { x: 100, y: 690, size: 14, font })
  page.drawText('—', { x: 100, y: 660, size: 12, font })
  page.drawText('CV placeholder. Replace public/shahzad_ahmad_cv.pdf with your full CV.', {
    x: 100,
    y: 630,
    size: 10,
    font,
  })

  const bytes = await doc.save()
  writeFileSync(outPath, bytes)
  console.log('Wrote', outPath)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
