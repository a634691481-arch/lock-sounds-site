export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { contact, content } = body

  if (!content || !content.trim()) {
    throw createError({ statusCode: 400, statusMessage: '反馈内容不能为空' })
  }

  const text = [
    '【锁车音效 用户反馈】',
    '',
    `联系方式：${contact || '未填写'}`,
    '',
    `反馈内容：${content}`,
    '',
    `时间：${new Date().toLocaleString('zh-CN')}`,
  ].join('\n')

  const res = await $fetch<{ code: number; msg: string }>('https://www.pushplus.plus/send', {
    method: 'POST',
    body: {
      token: process.env.PUSHPLUS_TOKEN || 'c25423061d04431fb9bf8df073ed8e39',
      title: '锁车音效 - 用户反馈',
      content: `<pre>${text}</pre>`,
      template: 'html',
    },
  }).catch(() => null)

  if (!res || res.code !== 200) {
    throw createError({ statusCode: 500, statusMessage: res?.msg || '发送失败，请稍后重试' })
  }

  return { ok: true }
})
