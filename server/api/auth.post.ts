import { createHash } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const { password } = await readBody(event)
  const pass = process.env.UPLOAD_PASS
  if (!pass) throw createError({ statusCode: 500, message: '后台没配密码' })
  if (password !== pass) throw createError({ statusCode: 401, message: '密码不对' })

  const token = createHash('md5').update(pass).digest('hex').slice(0, 16)
  setCookie(event, 'upload_key', token, {
    httpOnly: true, sameSite: 'strict', maxAge: 86400, secure: true, path: '/',
  })
  return { ok: true }
})
