import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const pool = db()

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayISO = today.toISOString().slice(0, 19).replace('T', ' ')

  const results = await Promise.all([
    pool.execute(`SELECT COUNT(*) as cnt FROM events WHERE event_type = 'pageview' AND created_at >= ?`, [todayISO]),
    pool.execute(`SELECT COUNT(*) as cnt FROM events WHERE event_type = 'pageview'`),
    pool.execute(
      `SELECT target_id as id, target_name as name, COUNT(*) as count FROM events WHERE event_type = 'sound_play' GROUP BY target_id, target_name ORDER BY count DESC LIMIT 10`,
    ),
    pool.execute(
      `SELECT target_id as id, target_name as name, COUNT(*) as count FROM events WHERE event_type = 'sound_download' GROUP BY target_id, target_name ORDER BY count DESC LIMIT 10`,
    ),
    pool.execute(
      `SELECT target_id as id, target_name as name, COUNT(*) as count FROM events WHERE event_type = 'wallpaper_view' GROUP BY target_id, target_name ORDER BY count DESC LIMIT 10`,
    ),
    pool.execute(
      `SELECT target_id as id, target_name as name, COUNT(*) as count FROM events WHERE event_type = 'wallpaper_download' GROUP BY target_id, target_name ORDER BY count DESC LIMIT 10`,
    ),
    pool.execute(
      `SELECT search_query as query, COUNT(*) as count FROM events WHERE event_type = 'search' AND search_query != '' GROUP BY search_query ORDER BY count DESC LIMIT 15`,
    ),
    pool.execute(
      `SELECT event_type, COUNT(*) as count FROM events WHERE created_at >= ? GROUP BY event_type`,
      [todayISO],
    ),
    pool.execute(
      `SELECT event_type, COUNT(*) as count FROM events WHERE event_type IN ('sound_download', 'wallpaper_download') GROUP BY event_type`,
    ),
    pool.execute(
      `SELECT HOUR(created_at) as hour, event_type, COUNT(*) as count FROM events WHERE created_at >= ? GROUP BY HOUR(created_at), event_type ORDER BY hour`,
      [todayISO],
    ),
  ])

  const [pvTodayRows] = results[0]
  const [pvTotalRows] = results[1]
  const [topPlaysRows] = results[2]
  const [topDownloadsRows] = results[3]
  const [topWallViewsRows] = results[4]
  const [topWallDlsRows] = results[5]
  const [topSearchesRows] = results[6]
  const [todaySummaryRows] = results[7]
  const [downloadTotalRows] = results[8]
  const [hourlyTrendRows] = results[9]

  const summary: Record<string, number> = {}
  ;(todaySummaryRows as any[])?.forEach((r: any) => { summary[r.event_type] = Number(r.count) })

  let download_total = 0
  ;(downloadTotalRows as any[])?.forEach((r: any) => { download_total += Number(r.count) })

  const hourly: Record<number, Record<string, number>> = {}
  ;(hourlyTrendRows as any[])?.forEach((r: any) => {
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
    pv_today: Number((pvTodayRows as any[])?.[0]?.cnt || 0),
    pv_total: Number((pvTotalRows as any[])?.[0]?.cnt || 0),
    top_plays: (topPlaysRows as any[]).map(r => ({ id: r.id, name: r.name, count: Number(r.count) })),
    top_downloads: (topDownloadsRows as any[]).map(r => ({ id: r.id, name: r.name, count: Number(r.count) })),
    top_wallpaper_views: (topWallViewsRows as any[]).map(r => ({ id: r.id, name: r.name, count: Number(r.count) })),
    top_wallpaper_downloads: (topWallDlsRows as any[]).map(r => ({ id: r.id, name: r.name, count: Number(r.count) })),
    top_searches: (topSearchesRows as any[]).map(r => ({ query: r.query, count: Number(r.count) })),
    today_summary: summary,
    download_total,
    hourly: { labels, pageview: pageviewSeries, play: playSeries },
  }
})