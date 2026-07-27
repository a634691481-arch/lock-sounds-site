import { getWallpapers } from '~/server/utils/wallpapers'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = Math.max(1, parseInt(String(query.page) || '1'))
  const pageSize = Math.min(60, Math.max(1, parseInt(String(query.pageSize) || '30')))
  const category = (query.category as string) || ''
  const sort = (query.sort as string) || 'latest'
  const search = (query.search as string) || ''

  let wallpapers = getWallpapers()

  if (search) {
    const kw = search.toLowerCase()
    wallpapers = wallpapers.filter(w => w.title.toLowerCase().includes(kw))
  }

  if (category && category !== '全部') {
    wallpapers = wallpapers.filter(w => w.category === category)
  }

  switch (sort) {
    case 'downloads':
      wallpapers.sort((a, b) => b.downloads - a.downloads)
      break
    case 'views':
      wallpapers.sort((a, b) => b.views - a.views)
      break
    default:
      wallpapers.sort((a, b) => b.date.localeCompare(a.date))
  }

  const total = wallpapers.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const items = wallpapers.slice(start, start + pageSize)

  setResponseHeader(event, 'Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  return { items, total, totalPages, page }
})
