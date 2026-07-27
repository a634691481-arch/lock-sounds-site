export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80)
}

export function soundSlug(sound: { id: string; name: string }): string {
  return `${sound.id}-${slugify(sound.name)}`
}

export function extractIdFromSlug(slug: string): string {
  return slug.substring(0, 32)
}
