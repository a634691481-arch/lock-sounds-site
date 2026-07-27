export function useInfiniteScroll(callback: () => void) {
  const sentinel = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  watch(sentinel, (el, _, onCleanup) => {
    observer?.disconnect()
    if (el) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) callback()
        },
        { rootMargin: '200px' }
      )
      observer.observe(el)
    }
    onCleanup(() => observer?.disconnect())
  }, { immediate: true })

  return sentinel
}
