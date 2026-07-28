<template>
  <main class="overflow-x-hidden w-full max-w-full min-h-screen bg-[#09090b]">
    <AppNav />

    <div class="max-w-2xl mx-auto px-5 pt-28 pb-16 relative z-10">
      <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-white/30 hover:text-[#e94560] text-xs font-semibold tracking-wide uppercase mb-10 transition-colors no-underline">
        <Icon name="arrow-left" class="w-3.5 h-3.5" /> 返回列表
      </NuxtLink>

      <template v-if="sound">
        <!-- Sound header card -->
        <div class="rounded-2xl border border-white/5 p-6 sm:p-8 mb-5" style="background: #12121a;">
          <div class="flex items-center gap-5">
            <button
              class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border-none cursor-pointer transition-all duration-500 ease-out"
              :class="isPlaying ? 'bg-emerald-500 scale-105 shadow-lg shadow-emerald-500/30' : 'bg-[#e94560] hover:scale-105 hover:shadow-lg hover:shadow-[#e94560]/30'"
              @click="togglePlay"
            >
              <Icon :name="isPlaying ? 'pause' : 'play'" class="w-6 h-6 text-white" :class="isPlaying ? '' : 'ml-0.5'" />
            </button>
            <div class="min-w-0">
              <h1 class="text-xl sm:text-2xl font-bold text-white leading-snug mb-1.5">{{ sound.name }}</h1>
              <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/30">
                <span>{{ sound.size }}</span>
                <span class="text-white/10">|</span>
                <span>{{ sound.duration }}</span>
                <span class="text-white/10">|</span>
                <span class="flex items-center gap-1"><Icon name="play" class="w-3 h-3" /> {{ sound.plays.toLocaleString() }}</span>
                <span class="text-white/10">|</span>
                <span class="flex items-center gap-1"><Icon name="arrow-down-tray" class="w-3 h-3" /> {{ sound.downloads.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3 mb-10">
          <button
            class="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold border border-white/10 text-white/50 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300"
            @click="handleShare"
          >
            <Icon name="arrow-top-right-on-square" class="w-3.5 h-3.5" /> 分享链接
          </button>
          <button
            class="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold border border-white/10 text-white/50 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300"
            @click="handleDownload"
          >
            <Icon name="arrow-down-tray" class="w-3.5 h-3.5" /> 下载音效
          </button>
        </div>

        <div class="text-center">
          <NuxtLink to="/" class="text-xs text-white/25 hover:text-[#e94560] transition-colors no-underline">
            发现更多锁车音效 <Icon name="arrow-right" class="w-3.5 h-3.5 inline" />
          </NuxtLink>
        </div>
      </template>

      <!-- Not found -->
      <div v-else-if="!loading" class="text-center py-24">
        <Icon name="magnifying-glass" class="w-12 h-12 text-white/10 mx-auto mb-4" />
        <p class="text-white/30 text-lg">音效未找到</p>
        <NuxtLink to="/" class="inline-block mt-4 text-xs text-[#e94560] hover:underline font-semibold">返回首页</NuxtLink>
      </div>
    </div>

    <!-- Audio player -->
    <AudioPlayer
      :sound="player.currentSound.value"
      :is-playing="!!player.playingId.value"
      :progress="player.progress.value"
      :time-display="player.timeDisplay.value"
      :buffered="player.buffered.value"
      @close="player.stop()"
      @seek="(v: number) => player.seek(v)"
      @pause="sound && player.play(sound)"
      @resume="sound && player.play(sound)"
      @download="sound && handleDownload()"
      @share="handleShare"
    />
  </main>
</template>

<script setup lang="ts">
import type { Sound } from '~/types/sound'

const route = useRoute()
const player = useAudioPlayer()
const toast = useToast()

const soundId = computed(() => extractIdFromSlug(route.params.slug as string))
const sound = ref<Sound | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    sound.value = await $fetch<Sound>(`/api/sounds/${soundId.value}`)
  } catch { sound.value = null }
  loading.value = false
})

const isPlaying = computed(() => player.playingId.value === soundId.value)

useSeoMeta({
  title: () => sound.value ? `${sound.value.name} - 锁车音效` : '锁车音效',
  description: () => sound.value
    ? `在线试听和下载"${sound.value.name}"锁车音效，时长${sound.value.duration}，大小${sound.value.size}。来自锁车音效分享平台。`
    : '锁车音效分享平台',
  ogTitle: () => sound.value ? `${sound.value.name} - 锁车音效` : '锁车音效分享平台',
  ogDescription: () => sound.value ? `在线试听和下载"${sound.value.name}"锁车音效` : '海量个性锁车音效免费试听下载',
  ogType: 'website',
})

useHead(() => ({
  link: [{ rel: 'canonical', href: sound.value ? `https://lock.mooon.vip/sounds/${soundSlug(sound.value)}` : `https://lock.mooon.vip/sounds/${soundId.value}` }],
  script: sound.value ? [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'AudioObject',
      name: sound.value.name,
      description: `锁车音效 - ${sound.value.name}`,
      duration: sound.value.duration,
      contentSize: sound.value.size,
      interactionStatistic: [
        { '@type': 'InteractionCounter', interactionType: { '@type': 'ListenAction' }, userInteractionCount: sound.value.plays },
        { '@type': 'InteractionCounter', interactionType: { '@type': 'DownloadAction' }, userInteractionCount: sound.value.downloads },
      ],
    }),
  }] : [],
}))

function togglePlay() {
  if (!sound.value) return
  player.play(sound.value)
}

function handleDownload() {
  if (!sound.value) return
  downloadFile(player.getAudioUrl(sound.value), sound.value.file)
}

function handleShare() {
  const url = window.location.href
  navigator.clipboard.writeText(url).then(() => {
    toast.success('链接已复制到剪贴板')
  }).catch(() => {
    toast.error('复制失败')
  })
}
</script>
