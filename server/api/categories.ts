import { getSounds } from '~/server/utils/sounds'

const CATEGORY_ORDER: Record<string, number> = {
  '01-网络热梗': 1,
  '02-动漫ACG': 2,
  '03-游戏音效': 3,
  '04-影视剧场': 4,
  '05-动物自然': 5,
  '06-汽车机械': 6,
  '07-系统提示': 7,
  '08-纯音效氛围': 8,
  '09-方言特色': 9,
  '10-锁车行车': 10,
  '11-音乐BGM': 11,
  '12-角色语音包': 12,
  '13-品牌开机': 13,
}

export default defineEventHandler((event) => {
  const sounds = getSounds()
  const catMap: Record<string, number> = {}
  for (const s of sounds) {
    catMap[s.category] = (catMap[s.category] || 0) + 1
  }
  const categories = Object.entries(catMap)
    .filter(([name]) => name in CATEGORY_ORDER)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => {
      const orderA = CATEGORY_ORDER[a.name]
      const orderB = CATEGORY_ORDER[b.name]
      return orderA - orderB
    })

  setResponseHeader(event, 'Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  return categories
})
