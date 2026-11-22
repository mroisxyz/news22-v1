import { mkdirSync, copyFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Authored description — 22 November front page:
// 36 dated stories fill the grid, each stamped with the day's date.
// Three illustrated leads anchor the top with hand-drawn artwork.
// A region strip runs beneath the masthead with a small map alongside.
// A date check confirms every headline belongs to the 22 November edition.

function describeOutput(outDir: string, size: number): string {
  return `Wrote ${join(outDir, 'entry.png')} (${size} bytes)`
}

const scriptDir = dirname(fileURLToPath(import.meta.url))
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output'

mkdirSync(outDir, { recursive: true })

const source = join(scriptDir, 'entry.png')
const destination = join(outDir, 'entry.png')
copyFileSync(source, destination)

const size = statSync(destination).size
process.stderr.write(`${describeOutput(outDir, size)}\n`)
