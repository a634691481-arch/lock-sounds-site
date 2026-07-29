import { createHash } from 'node:crypto'

function catchMsg(e: any): string {
  const msg = e?.data?.message || e?.message || String(e)
  if (msg.includes('401') || msg.includes('Bad credentials')) return 'Token 不对，检查 GITHUB_TOKEN'
  if (msg.includes('403')) return '没有权限，检查 Token 是否勾了 repo 权限'
  if (msg.includes('404')) return '仓库找不到，检查仓库名是否正确'
  if (msg.includes('422')) return '文件已在仓库中存在，但无法覆盖'
  if (msg.includes('413')) return '文件太大了'
  if (msg.includes('ENOTFOUND')) return '连不上 GitHub，检查网络'
  if (msg.includes('ECONNREFUSED')) return 'GitHub 拒绝了连接'
  return '上传失败: ' + (msg.length > 60 ? msg.slice(0, 60) + '...' : msg)
}

export default defineEventHandler(async (event) => {
  const key = getCookie(event, 'upload_key')
  const pass = process.env.UPLOAD_PASS
  const expected = pass ? createHash('md5').update(pass).digest('hex').slice(0, 16) : ''
  if (!expected || key !== expected) throw createError({ statusCode: 401, message: '没登录，请先输入密码' })

  const form = await readMultipartFormData(event)
  if (!form?.length) throw createError({ statusCode: 400, message: '还没选文件呢' })

  const fields: Record<string, string> = {}
  let fileBuf: Buffer | null = null
  let fileName = ''

  for (const f of form) {
    if (f.name && f.filename) {
      fileBuf = Buffer.from(f.data)
      const raw = f.filename
      fileName = typeof raw === 'string' ? raw : Buffer.from(raw).toString('utf8')
      fileName = fileName.replace(/[/\\:*?"<>|]/g, '_').replace(/\s+/g, '_')
    } else if (f.name && f.data) {
      fields[f.name] = Buffer.from(f.data).toString('utf8')
    }
  }

  if (!fileBuf || !fileName) throw createError({ statusCode: 400, message: '文件没选或读不出来' })

  const category = fields.category || ''
  const type = fields.type || 'sound'
  const title = fields.title || fileName.replace(/\.[^.]+$/, '')

  if (!category) throw createError({ statusCode: 400, message: '分类还没选' })

  const token = process.env.GITHUB_TOKEN
  if (!token) throw createError({ statusCode: 500, message: '后台没配 GITHUB_TOKEN，找站长' })

  const repo = 'a634691481-arch/lock-sounds-assets'
  const ghPath = type === 'sound'
    ? `${category}/${fileName}`
    : `wallpapers/${category}/${fileName}`

  const content = fileBuf.toString('base64')
  const headers = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' }
  const apiBase = `https://api.github.com/repos/${repo}/contents/${ghPath}`

  try {
    let sha = ''
    try { const r = await $fetch<any>(apiBase, { headers }); sha = r.sha } catch { /* 新文件 */ }

    const ghRes = await $fetch<any>(apiBase, {
      method: 'PUT',
      headers,
      body: { message: `上传: ${fileName}`, content, branch: 'main', ...(sha ? { sha } : {}) },
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

    throw createError({ statusCode: 400, message: '类型不对，只能是 音效 或 壁纸' })
  } catch (e: any) {
    if (e.statusCode) throw e
    throw createError({ statusCode: 500, message: catchMsg(e) })
  }
})
