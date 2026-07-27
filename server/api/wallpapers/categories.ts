import { getWallpapers } from '~/server/utils/wallpapers'

export default defineEventHandler(() => {
  const wallpapers = getWallpapers()
  const map: Record<string, number> = {}
  for (const w of wallpapers) {
    map[w.category] = (map[w.category] || 0) + 1
  }
  const total = Object.values(map).reduce((s, c) => s + c, 0)
  const categories = [
    { name: '全部', count: total },
    ...Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))
  ]

  setResponseHeader(event, 'Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  return categories
})
