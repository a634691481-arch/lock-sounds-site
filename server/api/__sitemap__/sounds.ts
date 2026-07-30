import { db } from '~/server/utils/db'

export default defineEventHandler(async () => {
  const [rows] = await db().query('SELECT id, name, date FROM sounds') as any
  return rows.map((s: any) => ({
    loc: `/sounds/${s.id}`,
    lastmod: s.date ? s.date.replace(/\//g, '-').slice(0, 10) : undefined,
  }))
})
