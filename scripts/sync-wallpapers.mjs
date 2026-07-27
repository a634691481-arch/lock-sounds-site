import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_PATH = path.resolve(__dirname, '..', 'wallpapers.json')
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/a634691481-arch/lock-sounds-assets@main/wallpapers'

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

  // Filter wallpaper PNG files: wallpapers/{category}/{file}.png
  const wpFiles = tree.filter(e => {
    const parts = e.path.split('/')
    return parts.length === 3 && parts[0] === 'wallpapers' && e.path.toLowerCase().endsWith('.png')
  })

  console.log(`Found ${wpFiles.length} PNG wallpapers in repo`)

  const wallpapers = []
  const cats = {}

  for (const entry of wpFiles) {
    const parts = entry.path.split('/')
    const category = parts[1]
    const fileName = parts[2]
    let name = fileName
      .replace(/\.png$/i, '')
    // Strip leading hex/MD5 (32+ hex chars followed by Chinese or nothing)
    name = name.replace(/^[0-9a-fA-F]{20,}(?=[\u4e00-\u9fff])/, '')
    name = name.replace(/^[0-9a-fA-F]{32}$/, fileName.replace(/\.png$/i, ''))
    // Strip leading numbers/underscores
    name = name.replace(/^[\d_]+/, '')
    name = name.trim()
    if (!name) name = fileName.replace(/\.png$/i, '')

    cats[category] = (cats[category] || 0) + 1

    wallpapers.push({
      id: entry.sha.substring(0, 8),
      title: name,
      category,
      width: 0,
      height: 0,
      thumb: `${CDN_BASE}/${encodeURIComponent(category)}/${encodeURIComponent(fileName)}`,
      medium: `${CDN_BASE}/${encodeURIComponent(category)}/${encodeURIComponent(fileName)}`,
      original: `${CDN_BASE}/${encodeURIComponent(category)}/${encodeURIComponent(fileName)}`,
      downloads: 0,
      views: 0,
      date: '2026-07-27',
    })
  }

  console.log('\nCategory breakdown:')
  for (const [cat, n] of Object.entries(cats).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${n}`)
  }

  console.log(`\nTotal: ${wallpapers.length} wallpapers`)
  fs.writeFileSync(OUT_PATH, JSON.stringify(wallpapers), 'utf-8')
  console.log('Written to wallpapers.json')
}

main().catch(e => { console.error(e); process.exit(1) })
