import { db } from '~/server/utils/db'
import { cache } from '~/server/utils/cache'

export default defineEventHandler(async (event) => {
  const key = 'sounds:' + getRequestURL(event).search

  const data = await cache(key, 30_000, async () => {
    const query = getQuery(event)
    const page = Math.max(1, parseInt(query.page as string || '1'))
    const pageSize = Math.min(100, Math.max(1, parseInt(query.pageSize as string || '50')))
    const category = (query.category as string) || ''
    const search = (query.search as string || '').toLowerCase()
    const sort = (query.sort as string) || 'plays'

    const conditions: string[] = []
    const params: (string | number)[] = []

    if (category) {
      conditions.push('category = ?')
      params.push(category)
    }
    if (search) {
      conditions.push('LOWER(name) LIKE ?')
      params.push(`%${search}%`)
    }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : ''
    const order = sort === 'downloads' ? 'ORDER BY downloads DESC' : sort === 'plays' ? 'ORDER BY plays DESC' : 'ORDER BY date DESC'

    const [[{ total }]] = await db().query(`SELECT COUNT(*) as total FROM sounds ${where}`, params) as any
    const totalPages = Math.ceil(total / pageSize) || 1

    const [rows] = await db().query(
      `SELECT * FROM sounds ${where} ${order} LIMIT ? OFFSET ?`,
      [...params, pageSize, (page - 1) * pageSize]
    ) as any

    const items = rows.map((r: any) => ({
      ...r,
      tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags || [],
      plays: Number(r.plays),
      downloads: Number(r.downloads),
      shares: Number(r.shares),
    }))

    return { items, total, page, pageSize, totalPages }
  })

  const cacheControl = getQuery(event).search || getQuery(event).category
    ? 'private, max-age=30'
    : 'public, max-age=300, stale-while-revalidate=3600'
  setResponseHeader(event, 'Cache-Control', cacheControl)

  return data
})
