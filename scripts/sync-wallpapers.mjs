import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import probe from 'probe-image-size'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_PATH = path.resolve(__dirname, '..', 'wallpapers.json')
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/a634691481-arch/lock-sounds-assets@main/wallpapers'
const CDN_RAW = 'https://raw.githubusercontent.com/a634691481-arch/lock-sounds-assets/main/wallpapers'

async function fetchRepoTree() {
  const url = 'https://api.github.com/repos/a634691481-arch/lock-sounds-assets/git/trees/main?recursive=1'
  const res = await fetch(url, {
    headers: { 'Accept': 'application/vnd.github+json', 'User-Agent': 'sync-wallpapers' }
  })
  const data = await res.json()
  if (!data.tree) throw new Error('API error: ' + JSON.stringify(data))
  return data.tree
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

async function main() {
  console.log('Fetching repo tree from GitHub API...')
  const tree = await fetchRepoTree()

  // Filter wallpaper image files: wallpapers/{category}/{file}
  const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.webp', '.avif']
  const wpFiles = tree.filter(e => {
    const parts = e.path.split('/')
    const ext = parts[parts.length - 1]?.toLowerCase().replace(/.*\./, '.')
    return parts.length === 3 && parts[0] === 'wallpapers' && IMAGE_EXTS.includes(ext)
  })

  console.log(`Found ${wpFiles.length} wallpapers in repo`)

  const wallpapers = []
  const cats = {}
  let probed = 0
  let failed = 0

  // Build entries first (without dimensions)
  const entries = wpFiles.map(entry => {
    const parts = entry.path.split('/')
    const category = parts[1]
    const fileName = parts[2]
    const ext = path.extname(fileName)
    let name = fileName.replace(new RegExp(`\\${ext}$`, 'i'), '')
    name = name.replace(/^[0-9a-fA-F]{20,}(?=[\u4e00-\u9fff])/, '')
    name = name.replace(/^[0-9a-fA-F]{32}$/, '')
    name = name.replace(/^[\d_]+/, '')
    name = name.trim()
    if (!name) name = fileName.replace(new RegExp(`\\${ext}$`, 'i'), '')
    cats[category] = (cats[category] || 0) + 1
    return { id: entry.sha.substring(0, 8), category, fileName, name, ext }
  })

  // Probe dimensions with concurrency limit of 10
  const CONCURRENCY = 10
  async function probeOne(e) {
    const imgUrl = `${CDN_BASE}/${encodeURIComponent(e.category)}/${encodeURIComponent(e.fileName)}`
    try {
      const dim = await probe(imgUrl, { timeout: 8000 })
      probed++
      return { ...e, width: dim.width, height: dim.height }
    } catch {
      failed++
      return { ...e, width: 0, height: 0 }
    }
  }

  for (let i = 0; i < entries.length; i += CONCURRENCY) {
    const batch = entries.slice(i, i + CONCURRENCY)
    const results = await Promise.all(batch.map(probeOne))
    for (const e of results) {
      wallpapers.push({
        id: e.id,
        title: e.name,
        category: e.category,
        width: e.width,
        height: e.height,
        thumb: `${CDN_BASE}/${encodeURIComponent(e.category)}/${encodeURIComponent(e.fileName)}`,
        medium: `${CDN_BASE}/${encodeURIComponent(e.category)}/${encodeURIComponent(e.fileName)}`,
        original: `${CDN_BASE}/${encodeURIComponent(e.category)}/${encodeURIComponent(e.fileName)}`,
        downloads: 0,
        views: 0,
        date: '2026-07-27',
      })
    }
    process.stdout.write(`\rProbing: ${Math.min(i + CONCURRENCY, entries.length)}/${entries.length} (${probed} ok, ${failed} failed)`)
  }

  console.log('')

  console.log('\nCategory breakdown:')
  for (const [cat, n] of Object.entries(cats).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${n}`)
  }

  console.log(`\nTotal: ${wallpapers.length} wallpapers`)
  fs.writeFileSync(OUT_PATH, JSON.stringify(wallpapers), 'utf-8')
  console.log('Written to wallpapers.json')
}

main().catch(e => { console.error(e); process.exit(1) })
