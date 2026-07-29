import { createHash } from 'node:crypto'

export default defineEventHandler((event) => {
  const key = getCookie(event, 'upload_key')
  const pass = process.env.UPLOAD_PASS
  const expected = pass ? createHash('md5').update(pass).digest('hex').slice(0, 16) : ''
  return { authed: key === expected && !!expected }
})
