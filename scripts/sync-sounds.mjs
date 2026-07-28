import fs from 'fs'
import crypto from 'crypto'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const EXISTING_PATH = path.resolve(__dirname, '..', 'sounds.json')

async function fetchAssetsTree() {
  const url = 'https://api.github.com/repos/a634691481-arch/lock-sounds-assets/git/trees/main?recursive=1'
  const res = await fetch(url, {
    headers: { 'Accept': 'application/vnd.github+json', 'User-Agent': 'sync-script' }
  })
  const data = await res.json()
  if (!data.tree) {
    console.error('Failed to fetch tree:', data)
    process.exit(1)
  }
  return data.tree
}

function filenameToName(file) {
  return file.replace(/\.wav$/i, '').replace(/^\d{2}-[^_]+_/, '').trim()
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex')
}

function getTodayStr() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

async function main() {
  console.log('Fetching assets tree from GitHub API...')
  const tree = await fetchAssetsTree()
  const wavFiles = tree.filter(e => e.path.toLowerCase().endsWith('.wav'))

  console.log(`Found ${wavFiles.length} WAV files in repo`)

  let existing = []
  try {
    existing = JSON.parse(fs.readFileSync(EXISTING_PATH, 'utf-8'))
    console.log(`Existing sounds.json has ${existing.length} entries`)
  } catch {
    console.log('No existing sounds.json, starting fresh')
  }

  const existingMap = new Map()
  for (const s of existing) {
    existingMap.set(s.file, s)
  }

  const today = getTodayStr()
  const sounds = []
  let newCount = 0
  let updatedCount = 0
  const categoryCounts = new Map()

  for (const entry of wavFiles) {
    const fileName = path.basename(entry.path)
    const dirParts = entry.path.split('/')
    const category = dirParts.length >= 2 ? dirParts[0] : '未分类'

    categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1)

    const existingEntry = existingMap.get(fileName)

    if (existingEntry) {
      const newSize = formatSize(entry.size)
      if (newSize !== existingEntry.size) {
        existingEntry.size = newSize
        updatedCount++
      }
      if (existingEntry.category !== category) {
        existingEntry.category = category
        updatedCount++
      }
      sounds.push(existingEntry)
      existingMap.delete(fileName)
    } else {
      sounds.push({
        id: md5(fileName),
        name: filenameToName(fileName),
        category,
        tags: [],
        size: formatSize(entry.size),
        duration: '00:00',
        plays: 0,
        downloads: 0,
        shares: 0,
        date: today,
        file: fileName,
      })
      newCount++
    }
  }

  const removed = [...existingMap.keys()]

  // Sort by date descending
  sounds.sort((a, b) => b.date.localeCompare(a.date))

  console.log(`\nCategory breakdown:`)
  for (const [cat, count] of [...categoryCounts].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${count}`)
  }

  console.log(`\nSummary:`)
  console.log(`  Total: ${sounds.length} (+${newCount} new)`)
  if (removed.length) {
    console.log(`  Removed: ${removed.length}`)
    removed.forEach(f => console.log(`    - ${f}`))
  }
  if (updatedCount) console.log(`  Updated: ${updatedCount} changes`)

  fs.writeFileSync(EXISTING_PATH, JSON.stringify(sounds, null, 2), 'utf-8')
  console.log(`\nWritten to sounds.json`)
}

main().catch(e => { console.error(e); process.exit(1) })
