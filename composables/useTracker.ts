export function useTracker() {
  function track(type: string, payload?: {
    target_id?: string
    target_name?: string
    search_query?: string
    result_count?: number
  }) {
    $fetch('/api/track', {
      method: 'POST',
      body: { type, ...payload },
    }).catch(() => {})
  }

  function trackPageView() {
    if (import.meta.client) {
      track('pageview', { target_name: window.location.pathname })
    }
  }

  function trackSoundPlay(sound: { id: string; name: string }) {
    track('sound_play', { target_id: sound.id, target_name: sound.name })
  }

  function trackSoundDownload(sound: { id: string; name: string }) {
    track('sound_download', { target_id: sound.id, target_name: sound.name })
  }

  function trackSoundShare(sound: { id: string; name: string }) {
    track('sound_share', { target_id: sound.id, target_name: sound.name })
  }

  function trackWallpaperView(wp: { id: number; title: string }) {
    track('wallpaper_view', { target_id: String(wp.id), target_name: wp.title })
  }

  function trackWallpaperDownload(wp: { id: number; title: string }) {
    track('wallpaper_download', { target_id: String(wp.id), target_name: wp.title })
  }

  function trackSearch(query: string, resultCount: number) {
    if (!query) return
    track('search', { search_query: query, result_count: resultCount })
  }

  return {
    track,
    trackPageView,
    trackSoundPlay,
    trackSoundDownload,
    trackSoundShare,
    trackWallpaperView,
    trackWallpaperDownload,
    trackSearch,
  }
}
