const store = new Map<string, { data: any; expires: number }>()

export function cache<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
  const hit = store.get(key)
  if (hit && Date.now() < hit.expires) return Promise.resolve(hit.data as T)
  return fn().then(data => {
    store.set(key, { data, expires: Date.now() + ttlMs })
    return data
  })
}
