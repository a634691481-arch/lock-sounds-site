import { getSounds } from '~/server/utils/sounds'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  let sounds = getSounds()

  const search = (query.search as string || '').toLowerCase()
  const category = query.category as string || ''
  const sort = query.sort as string || 'latest'
  const page = Math.max(1, parseInt(query.page as string || '1'))
  const pageSize = Math.min(100, Math.max(1, parseInt(query.pageSize as string || '50')))

  if (category && category !== '全部') {
    sounds = sounds.filter(s => s.category === category)
  }
  if (search) {
    sounds = sounds.filter(s => s.name.toLowerCase().includes(search))
  }

  switch (sort) {
    case 'plays':
      sounds.sort((a, b) => b.plays - a.plays)
      break
    case 'downloads':
      sounds.sort((a, b) => b.downloads - a.downloads)
      break
    case 'latest':
    default:
      sounds.sort((a, b) => b.date.localeCompare(a.date))
      break
  }

  const total = sounds.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const items = sounds.slice(start, start + pageSize)

  const cacheControl = search || category !== '全部'
    ? 'private, max-age=30'
    : 'public, max-age=300, stale-while-revalidate=3600'

  setResponseHeader(event, 'Cache-Control', cacheControl)
  return { items, total, page, pageSize, totalPages }
})
