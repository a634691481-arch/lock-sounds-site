import { db } from '~/server/utils/db'

interface TrackBody {
  type: string
  target_id?: string
  target_name?: string
  search_query?: string
  result_count?: number
}

export default defineEventHandler(async (event) => {
  const body = await readBody<TrackBody>(event)
  if (!body.type) throw createError({ statusCode: 400, message: 'type required' })

  const page_url = getHeader(event, 'referer') || ''
  const user_agent = getHeader(event, 'user-agent') || ''
  const ip = getRequestIP(event) || ''

  const pool = db()
  const values = [
    body.type,
    body.target_id || '',
    body.target_name || '',
    page_url,
    user_agent,
    ip,
    body.search_query || '',
    body.result_count ?? -1,
  ]

  pool.execute(
    `INSERT INTO events (event_type, target_id, target_name, page_url, user_agent, ip, search_query, result_count) VALUES (?,?,?,?,?,?,?,?)`,
    values,
  ).catch(() => {})

  if (body.target_id) {
    switch (body.type) {
      case 'sound_play':
        pool.execute(`UPDATE sounds SET plays = plays + 1 WHERE id = ?`, [body.target_id]).catch(() => {})
        pool.execute(`UPDATE sounds SET downloads = downloads + 1 WHERE id = ?`, [body.target_id]).catch(() => {})
        break
      case 'sound_download':
        pool.execute(`UPDATE sounds SET downloads = downloads + 1 WHERE id = ?`, [body.target_id]).catch(() => {})
        break
      case 'sound_share':
        pool.execute(`UPDATE sounds SET shares = shares + 1 WHERE id = ?`, [body.target_id]).catch(() => {})
        break
      case 'wallpaper_view':
        pool.execute(`UPDATE wallpapers SET views = views + 1 WHERE id = ?`, [body.target_id]).catch(() => {})
        break
      case 'wallpaper_download':
        pool.execute(`UPDATE wallpapers SET downloads = downloads + 1 WHERE id = ?`, [body.target_id]).catch(() => {})
        break
    }
  }

  return { ok: true }
})
