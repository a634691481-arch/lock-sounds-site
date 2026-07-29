import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const [rows] = await db().query('SELECT * FROM sounds WHERE id = ?', [id]) as any
  if (!rows.length) {
    throw createError({ statusCode: 404, statusMessage: 'Sound not found' })
  }
  const r = rows[0]
  return {
    ...r,
    tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags || [],
    plays: Number(r.plays),
    downloads: Number(r.downloads),
    shares: Number(r.shares),
  }
})
