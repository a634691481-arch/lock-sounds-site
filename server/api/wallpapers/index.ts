import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Math.max(1, parseInt(String(query.page) || '1'))
  const pageSize = Math.min(60, Math.max(1, parseInt(String(query.pageSize) || '30')))
  const category = (query.category as string) || ''
  const sort = (query.sort as string) || 'latest'
  const search = (query.search as string) || ''

  const conditions: string[] = []
  const params: (string | number)[] = []

  if (search) {
    conditions.push('title LIKE ?')
    params.push(`%${search}%`)
  }
  if (category) {
    conditions.push('category = ?')
    params.push(category)
  }

  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : ''
  const order = sort === 'downloads' ? 'ORDER BY downloads DESC' : sort === 'views' ? 'ORDER BY views DESC' : 'ORDER BY date DESC'

  const [[{ total }]] = await db().query(`SELECT COUNT(*) as total FROM wallpapers ${where}`, params) as any
  const totalPages = Math.ceil(total / pageSize) || 1

  const [rows] = await db().query(
    `SELECT * FROM wallpapers ${where} ${order} LIMIT ? OFFSET ?`,
    [...params, pageSize, (page - 1) * pageSize]
  ) as any

  const items = rows.map((r: any) => ({
    ...r,
    width: Number(r.width),
    height: Number(r.height),
    downloads: Number(r.downloads),
    views: Number(r.views),
  }))

  setResponseHeader(event, 'Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  return { items, total, totalPages, page }
})
