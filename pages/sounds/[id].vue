<template>
  <div
    class="min-h-screen relative"
    style="background: linear-gradient(135deg,#fef2f2 0%,#fdf2f8 25%,#faf5ff 50%,#eff6ff 75%,#f0fdf4 100%)"
  >
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-pink-300/20 blur-3xl" />
      <div class="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-purple-300/15 blur-3xl" />
    </div>

    <div class="max-w-2xl mx-auto px-5 pt-20 pb-16 relative z-10">
      <NuxtLink to="/" class="inline-flex items-center gap-1 text-slate-400 hover:text-[#e94560] text-sm mb-8 transition-colors">
        ← 返回列表
      </NuxtLink>

      <template v-if="sound">
        <div class="doppelrand shadow-tint mb-4">
          <div class="doppelrand-inner px-6 py-6 flex items-center gap-5">
            <button
              class="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border-none cursor-pointer transition-all duration-300 active:scale-90"
              :class="isPlaying ? 'bg-emerald-400 scale-105' : 'bg-[#e94560]'"
              @click="togglePlay"
            >
              <span class="text-white text-xl">{{ isPlaying ? '⏸' : '▶' }}</span>
            </button>
            <div class="min-w-0">
              <h1 class="text-xl font-bold text-slate-800 leading-snug mb-1">{{ sound.name }}</h1>
              <div class="flex items-center gap-2 text-xs text-slate-400">
                <span>{{ sound.size }}</span>
                <span class="text-slate-300">·</span>
                <span>{{ sound.duration }}</span>
                <span class="text-slate-300">·</span>
                <span>▶ {{ sound.plays.toLocaleString() }}</span>
                <span class="text-slate-300">·</span>
                <span>⬇ {{ sound.downloads.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="doppelrand shadow-tint mb-6">
          <div class="doppelrand-inner px-6 py-4 flex items-center justify-between gap-4">
            <button class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 text-sm text-slate-500 hover:bg-[#e94560] hover:text-white border-none cursor-pointer transition-all duration-200 active:scale-90"
              @click="handleShare">
              ↗ 分享链接
            </button>
            <button class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 text-sm text-slate-500 hover:bg-[#e94560] hover:text-white border-none cursor-pointer transition-all duration-200 active:scale-90"
              @click="handleDownload">
              ⬇ 下载音效
            </button>
          </div>
        </div>

        <div class="text-center">
          <NuxtLink to="/" class="text-sm text-slate-400 hover:text-[#e94560] transition-colors">
            发现更多锁车音效 →
          </NuxtLink>
        </div>
      </template>

      <div v-else class="text-center py-24">
        <div class="text-5xl mb-4">🔍</div>
        <p class="text-slate-500 text-lg">音效未找到</p>
        <NuxtLink to="/" class="inline-block mt-4 text-[#e94560] hover:underline">返回首页</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Sound } from '~/types/sound'

const route = useRoute()
const player = useAudioPlayer()

const { data, error } = await useFetch<Sound>(`/api/sounds/${route.params.id}`)
const sound = computed(() => data.value ?? null)

const isPlaying = computed(() => player.playingId.value === route.params.id)

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
  link: [{ rel: 'canonical', href: `https://lock-sounds.vercel.app/sounds/${route.params.id}` }],
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
  const a = document.createElement('a')
  a.href = player.getAudioUrl(sound.value)
  a.download = sound.value.file
  a.click()
}

function handleShare() {
  const url = window.location.href
  navigator.clipboard.writeText(url).then(() => {
    useToast().success('链接已复制到剪贴板')
  }).catch(() => {
    useToast().error('复制失败')
  })
}
</script>
