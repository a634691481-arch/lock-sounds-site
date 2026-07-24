import type { Sound } from '~/types/sound'

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/a634691481-arch/lock-sounds-assets@main'

export function useAudioPlayer() {
  const playingId = ref<string | null>(null)
  const currentSound = ref<Sound | null>(null)
  const bufferingId = ref<string | null>(null)
  const progress = ref(0)
  const duration = ref(0)
  const currentTime = ref(0)
  const volume = ref(1)
  const buffered = ref(0)
  const autoPlay = ref(true)

  let audio: HTMLAudioElement | null = null
  let rafId = 0
  let onAutoNext: (() => void) | null = null

  function getAudioUrl(sound: Sound) {
    return `${CDN_BASE}/${encodeURIComponent(sound.category)}/${encodeURIComponent(sound.file)}`
  }

  function fmt(sec: number) {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const timeDisplay = computed(() => `${fmt(currentTime.value)} / ${fmt(duration.value)}`)

  function tick() {
    if (!audio) return
    currentTime.value = audio.currentTime
    duration.value = audio.duration || 0
    progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0
    if (audio.buffered.length > 0) {
      buffered.value = (audio.buffered.end(audio.buffered.length - 1) / audio.duration) * 100
    }
    rafId = requestAnimationFrame(tick)
  }

  function startTimer() {
    stopTimer()
    rafId = requestAnimationFrame(tick)
  }

  function stopTimer() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0 }
  }

  function cleanup() {
    if (audio) {
      audio.pause()
      audio.remove()
      audio = null
    }
    stopTimer()
  }

  function play(sound: Sound) {
    if (playingId.value === sound.id) {
      if (audio && !audio.paused) {
        audio.pause()
        playingId.value = null
        currentSound.value = null
        stopTimer()
        return
      }
      if (audio) { audio.play(); playingId.value = sound.id; startTimer() }
      return
    }

    cleanup()

    bufferingId.value = sound.id
    audio = new Audio(getAudioUrl(sound))
    audio.volume = volume.value
    audio.preload = 'auto'

    audio.addEventListener('canplay', () => {
      bufferingId.value = null
    })

    audio.addEventListener('error', (e) => {
      bufferingId.value = null
      const err = (e.target as HTMLAudioElement).error
      if (err && err.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
        cleanup()
        playingId.value = null
        currentSound.value = null
      }
      if (err) {
        console.error(`[Audio Error] ${sound.name} | code=${err.code} | URL: ${(e.target as HTMLAudioElement).src}`)
      }
    })

    audio.addEventListener('ended', () => {
      playingId.value = null
      stopTimer()
      if (autoPlay.value && onAutoNext) {
        onAutoNext()
      }
    })

    audio.play().then(() => {
      playingId.value = sound.id
      currentSound.value = sound
      duration.value = audio!.duration || 0
      startTimer()
    }).catch(() => {
      bufferingId.value = null
    })
  }

  function stop() {
    cleanup()
    playingId.value = null
    currentSound.value = null
    bufferingId.value = null
    progress.value = 0
    duration.value = 0
    currentTime.value = 0
    buffered.value = 0
  }

  function setVolume(v: number) {
    volume.value = v
    if (audio) audio.volume = v
  }

  function seek(val: number) {
    if (audio) audio.currentTime = (val / 100) * (audio.duration || 0)
  }

  return {
    playingId, currentSound, bufferingId,
    progress, duration, currentTime, volume, buffered, autoPlay,
    timeDisplay, getAudioUrl,
    play, stop, setVolume, seek,
    set onAutoNext(cb: (() => void) | null) { onAutoNext = cb }
  }
}
