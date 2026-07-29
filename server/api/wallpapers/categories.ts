import { db } from '~/server/utils/db'
import { cache } from '~/server/utils/cache'

export default defineEventHandler(async (event) => {
  const data = await cache('wallpapers-categories', 600_000, async () => {
    const [rows] = await db().query(
      'SELECT category, COUNT(*) as count FROM wallpapers GROUP BY category ORDER BY count DESC'
    ) as any
    const total = rows.reduce((s: number, r: any) => s + Number(r.count), 0)
    return [
      { name: '全部', count: total },
      ...rows.map((r: any) => ({ name: r.category, count: Number(r.count) }))
    ]
  })

  setResponseHeader(event, 'Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  return data
})
