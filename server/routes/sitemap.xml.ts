import { getSounds } from '~/server/utils/sounds'

const SITE_URL = process.env.SITE_URL || 'https://lock.moon.vip'

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export default defineEventHandler(() => {
  const sounds = getSounds()
  const urls: string[] = [
    SITE_URL,
    ...sounds.map(s => `${SITE_URL}/sounds/${s.id}`),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${escapeXml(u)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${u === SITE_URL ? '1.0' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return xml
})
