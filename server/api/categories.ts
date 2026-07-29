import { db } from '~/server/utils/db'

const CATS = ['01-网络热梗','02-动漫ACG','03-游戏音效','04-影视剧场','05-动物自然','06-汽车机械','07-系统提示','08-纯音效氛围','09-方言特色','10-锁车行车','11-音乐BGM','12-角色语音包','13-品牌开机']

export default defineEventHandler(async (event) => {
  const placeholders = CATS.map(() => '?').join(',')
  const [rows] = await db().query(
    `SELECT category, COUNT(*) as count FROM sounds WHERE category IN (${placeholders}) GROUP BY category`,
    CATS
  ) as any

  const map = Object.fromEntries(rows.map((r: any) => [r.category, Number(r.count)]))
  const categories = CATS.filter(c => map[c]).map(c => ({ name: c, count: map[c] }))

  setResponseHeader(event, 'Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  return categories
})
