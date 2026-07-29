import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const [rows] = await db().query(
    'SELECT category, COUNT(*) as count FROM wallpapers GROUP BY category ORDER BY count DESC'
  ) as any

  const total = rows.reduce((s: number, r: any) => s + Number(r.count), 0)
  const categories = [
    { name: '全部', count: total },
    ...rows.map((r: any) => ({ name: r.category, count: Number(r.count) }))
  ]

  setResponseHeader(event, 'Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  return categories
})
