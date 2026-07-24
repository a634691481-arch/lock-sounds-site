import { getSounds } from '~/server/utils/sounds'

export default defineEventHandler((event) => {
  const sounds = getSounds()
  const catMap: Record<string, number> = {}
  for (const s of sounds) {
    catMap[s.category] = (catMap[s.category] || 0) + 1
  }
  const categories = Object.entries(catMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  setResponseHeader(event, 'Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  return categories
})
