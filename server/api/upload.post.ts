import { createHash } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  if (!form?.length) throw createError({ statusCode: 400, message: '请选择文件' })

  const fields: Record<string, string> = {}
  let fileBuf: Buffer | null = null
  let fileName = ''

  for (const f of form) {
    if (f.name && f.filename) {
      fileBuf = Buffer.from(f.data)
      fileName = Buffer.from(f.filename, 'latin1').toString('utf8')
    } else if (f.name && f.data) {
      fields[f.name] = Buffer.from(f.data, 'latin1').toString('utf8')
    }
  }

  if (!fileBuf || !fileName) throw createError({ statusCode: 400, message: '文件无效' })

  const category = fields.category || ''
  const type = fields.type || 'sound'
  const title = fields.title || fileName.replace(/\.[^.]+$/, '')

  if (!category) throw createError({ statusCode: 400, message: '请选择分类' })

  const token = process.env.GITHUB_TOKEN
  const repo = 'a634691481-arch/lock-sounds-assets'
  const ghPath = type === 'sound'
    ? `${category}/${fileName}`
    : `wallpapers/${category}/${fileName}`

  const content = fileBuf.toString('base64')

  const ghRes = await $fetch<any>(`https://api.github.com/repos/${repo}/contents/${ghPath}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
    body: {
      message: `upload: ${fileName}`,
      content,
      branch: 'main',
    },
  })

  const now = new Date()
  const dateStr = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`

  const sizeKB = (fileBuf.length / 1024).toFixed(2) + ' KB'

  if (type === 'sound') {
    const id = createHash('md5').update(fileName + Date.now()).digest('hex')
    const { db } = await import('~/server/utils/db')
    await db().query(
      'INSERT INTO sounds (id,name,category,tags,size,duration,plays,downloads,shares,date,file) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [id, title, category, '[]', sizeKB, '00:00', 0, 0, 0, dateStr, fileName]
    )
    return { success: true, url: ghRes.content?.html_url, id, type: 'sound' }
  }

  if (type === 'wallpaper') {
    const id = createHash('md5').update(fileName + Date.now()).digest('hex').slice(0, 8)
    const cdnUrl = `https://cdn.jsdelivr.net/gh/${repo}@main/${ghPath}`
    const { db } = await import('~/server/utils/db')
    await db().query(
      'INSERT INTO wallpapers (id,title,category,width,height,thumb,medium,original,downloads,views,date) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [id, title, category, 0, 0, cdnUrl, cdnUrl, cdnUrl, 0, 0, dateStr]
    )
    return { success: true, url: ghRes.content?.html_url, id, type: 'wallpaper' }
  }

  throw createError({ statusCode: 400, message: '未知类型' })
})
