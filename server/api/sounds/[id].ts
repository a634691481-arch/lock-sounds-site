import { getSounds } from '~/server/utils/sounds'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const sound = getSounds().find(s => s.id === id)
  if (!sound) {
    throw createError({ statusCode: 404, statusMessage: 'Sound not found' })
  }
  return sound
})
