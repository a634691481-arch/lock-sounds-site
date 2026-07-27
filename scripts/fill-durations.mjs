import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SOUNDS_PATH = path.resolve(__dirname, '..', 'sounds.json')
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/a634691481-arch/lock-sounds-assets@main'
const CONCURRENCY = 8

function parseWavHeader(buf) {
  // buf: first 128 bytes of WAV file
  if (buf.length < 44) return null
  const riff = buf.toString('ascii', 0, 4)
  if (riff !== 'RIFF') return null

  const fmtSize = buf.readUInt32LE(16)
  const audioFormat = buf.readUInt16LE(20)
  if (audioFormat !== 1) return null // PCM only

  const channels = buf.readUInt16LE(22)
  const sampleRate = buf.readUInt32LE(24)
  const byteRate = buf.readUInt32LE(28)
  const bitsPerSample = buf.readUInt16LE(34)

  return { channels, sampleRate, byteRate, bitsPerSample, headerSize: fmtSize === 16 ? 44 : 44 + fmtSize - 16 }
}

function calcDuration(fileSize, byteRate, headerSize) {
  const dataSize = fileSize - headerSize
  const seconds = dataSize / byteRate
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`
}

async function fetchHeader(url) {
  const res = await fetch(url, {
    headers: { Range: 'bytes=0-127' }
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  return parseWavHeader(buf)
}

async function main() {
  const sounds = JSON.parse(fs.readFileSync(SOUNDS_PATH, 'utf-8'))
  const missing = sounds.filter(s => s.duration === '00:00')

  console.log(`Found ${missing.length} sounds missing duration`)

  let fixed = 0
  let failed = 0
  let nonStd = 0
  let saved = 0

  async function processSound(s) {
    const url = `${CDN_BASE}/${encodeURIComponent(s.category)}/${encodeURIComponent(s.file)}`
    try {
      const header = await fetchHeader(url)
      if (!header) { nonStd++; return }
      const fileSize = parseSize(s.size)
      if (!fileSize || !header.byteRate) { nonStd++; return }
      s.duration = calcDuration(fileSize, header.byteRate, header.headerSize)
      fixed++
    } catch (e) {
      failed++
      if (failed <= 10) console.error(`  FAIL ${s.file}: ${e.message}`)
    }
  }

  // Process in batches with periodic saves
  for (let i = 0; i < missing.length; i += CONCURRENCY) {
    const batch = missing.slice(i, i + CONCURRENCY)
    await Promise.all(batch.map(processSound))

    const done = Math.min(i + CONCURRENCY, missing.length)
    if (done % 200 === 0 || done === missing.length) {
      const prevSaved = saved
      const newFixes = fixed - prevSaved
      fs.writeFileSync(SOUNDS_PATH, JSON.stringify(sounds, null, 2), 'utf-8')
      saved = fixed
      console.log(`  ${done}/${missing.length} | ${fixed} ok, ${nonStd} non-pcm, ${failed} err | saved`)
    }
  }

  console.log(`\nSaved: ${fixed} durations filled, ${failed} failed`)
  fs.writeFileSync(SOUNDS_PATH, JSON.stringify(sounds, null, 2), 'utf-8')
}

function parseSize(str) {
  if (!str) return 0
  // "571.11 KB" -> bytes
  const match = str.match(/^([\d.]+)\s*(B|KB|MB|GB)$/i)
  if (!match) return 0
  const val = parseFloat(match[1])
  const unit = match[2].toUpperCase()
  const mult = { B: 1, KB: 1024, MB: 1024 * 1024, GB: 1024 * 1024 * 1024 }
  return Math.round(val * (mult[unit] || 1))
}

main().catch(e => { console.error(e); process.exit(1) })
