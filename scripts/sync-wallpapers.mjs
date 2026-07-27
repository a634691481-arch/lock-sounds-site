// Sync wallpaper meta.json from GitHub raw to local wallpapers.json
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_PATH = path.resolve(__dirname, '..', 'wallpapers.json')
const URL = 'https://raw.githubusercontent.com/a634691481-arch/lock-sounds-assets/main/wallpapers/meta.json'

async function main() {
  console.log('Fetching wallpaper meta...')
  const res = await fetch(URL)
  const data = await res.json()
  
  // Strip to needed fields
  const wallpapers = data.map((w) => ({
    id: w.id,
    title: w.title,
    category: w.category,
    width: w.width,
    height: w.height,
    thumb: w.thumb_url,
    medium: w.medium_url,
    original: w.original_url,
    downloads: w.downloads,
    views: w.views,
    date: w.created_at,
  }))

  const cats = {}
  for (const w of wallpapers) {
    cats[w.category] = (cats[w.category] || 0) + 1
  }

  console.log(`Total: ${wallpapers.length} wallpapers`)
  for (const [c, n] of Object.entries(cats).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${c}: ${n}`)
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(wallpapers), 'utf-8')
  console.log(`\nWritten to wallpapers.json`)
}

main().catch(e => { console.error(e); process.exit(1) })
