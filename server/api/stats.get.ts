import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const pool = db()

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayISO = today.toISOString().slice(0, 19).replace('T', ' ')

  const date7d = new Date(today)
  date7d.setDate(date7d.getDate() - 7)
  const date7dISO = date7d.toISOString().slice(0, 19).replace('T', ' ')

  const [
    [pvTodayRow],
    [pvTotalRow],
    topPlays,
    topDownloads,
    topWallViews,
    topWallDls,
    topSearches,
    todaySummary,
    hourlyTrend,
  ] = await Promise.all([
    pool.execute(`SELECT COUNT(*) as cnt FROM events WHERE event_type = 'pageview' AND created_at >= ?`, [todayISO]),
    pool.execute(`SELECT COUNT(*) as cnt FROM events WHERE event_type = 'pageview'`),
    pool.execute(
      `SELECT target_id as id, target_name as name, COUNT(*) as count FROM events WHERE event_type = 'sound_play' AND created_at >= ? GROUP BY target_id, target_name ORDER BY count DESC LIMIT 10`,
      [date7dISO],
    ),
    pool.execute(
      `SELECT target_id as id, target_name as name, COUNT(*) as count FROM events WHERE event_type = 'sound_download' AND created_at >= ? GROUP BY target_id, target_name ORDER BY count DESC LIMIT 10`,
      [date7dISO],
    ),
    pool.execute(
      `SELECT target_id as id, target_name as name, COUNT(*) as count FROM events WHERE event_type = 'wallpaper_view' AND created_at >= ? GROUP BY target_id, target_name ORDER BY count DESC LIMIT 10`,
      [date7dISO],
    ),
    pool.execute(
      `SELECT target_id as id, target_name as name, COUNT(*) as count FROM events WHERE event_type = 'wallpaper_download' AND created_at >= ? GROUP BY target_id, target_name ORDER BY count DESC LIMIT 10`,
      [date7dISO],
    ),
    pool.execute(
      `SELECT search_query as query, COUNT(*) as count FROM events WHERE event_type = 'search' AND created_at >= ? GROUP BY search_query ORDER BY count DESC LIMIT 15`,
      [date7dISO],
    ),
    pool.execute(
      `SELECT event_type, COUNT(*) as count FROM events WHERE created_at >= ? GROUP BY event_type`,
      [todayISO],
    ),
    pool.execute(
      `SELECT HOUR(created_at) as hour, event_type, COUNT(*) as count FROM events WHERE created_at >= ? GROUP BY HOUR(created_at), event_type ORDER BY hour`,
      [todayISO],
    ),
  ])

  const summary: Record<string, number> = {}
  ;(todaySummary as any[]).forEach((r: any) => { summary[r.event_type] = Number(r.count) })

  const hourly: Record<number, Record<string, number>> = {}
  ;(hourlyTrend as any[]).forEach((r: any) => {
    const h = Number(r.hour)
    if (!hourly[h]) hourly[h] = {}
    hourly[h][r.event_type] = Number(r.count)
  })

  const labels: string[] = []
  const pageviewSeries: number[] = []
  const playSeries: number[] = []
  for (let h = 0; h <= 23; h++) {
    labels.push(`${h}时`)
    pageviewSeries.push(hourly[h]?.pageview || 0)
    playSeries.push(hourly[h]?.sound_play || 0)
  }

  setResponseHeader(event, 'Cache-Control', 'no-cache')

  return {
    pv_today: Number((pvTodayRow as any)?.cnt || 0),
    pv_total: Number((pvTotalRow as any)?.cnt || 0),
    top_plays: (topPlays as any[]).map(r => ({ id: r.id, name: r.name, count: Number(r.count) })),
    top_downloads: (topDownloads as any[]).map(r => ({ id: r.id, name: r.name, count: Number(r.count) })),
    top_wallpaper_views: (topWallViews as any[]).map(r => ({ id: r.id, name: r.name, count: Number(r.count) })),
    top_wallpaper_downloads: (topWallDls as any[]).map(r => ({ id: r.id, name: r.name, count: Number(r.count) })),
    top_searches: (topSearches as any[]).map(r => ({ query: r.query, count: Number(r.count) })),
    today_summary: summary,
    hourly: { labels, pageview: pageviewSeries, play: playSeries },
  }
})
