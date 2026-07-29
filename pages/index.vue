<template>
  <main class="overflow-x-hidden w-full max-w-full bg-[#09090b]">
    <AppNav />

    <!-- Hero -->
    <HeroSection
      title="让你的锁车声，与众不同"
      overline="NIO L60 · 2026 Edition · <span style='color:#e94560;font-weight:700'>川A·BQ0326</span> 求偶遇，滴滴即友"
      subtitle="海量个性锁车音效免费在线试听与下载。涵盖网络热梗、动漫游戏、影视剧场等13个分类，共计2038+款音效每日更新。"
      :showCtas="true"
      ctaPrimary="浏览音效"
      ctaPrimaryHref="#sounds"
      ctaSecondary="查看壁纸"
      ctaSecondaryHref="/wallpapers"
      bgColor="#09090b"
      glowColor="#e9456025"
    />

    <!-- Marquee -->
    <InfiniteMarquee
      v-if="topTags.length"
      :items="topTags"
      :speed="30"
      bg="#0c0c14"
      textColor="#ffffff10"
      dotColor="#e9456030"
    />

    <!-- Sounds section -->
    <section id="sounds" class="relative py-24 sm:py-32" style="background: #09090b;">
      <div class="max-w-7xl mx-auto px-5">
        <div class="mb-12">
          <p class="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-white/30 font-semibold mb-4">
            音效分类
          </p>
          <div class="flex items-start justify-between gap-6">
            <h2 class="flex-shrink-0 whitespace-nowrap text-xl sm:text-3xl font-bold text-white leading-tight mt-1">
              探索 {{ categories.length }} 个分类
            </h2>
            <div ref="catScrollRef" class="relative w-[60%] min-w-0 flex gap-2 overflow-x-auto flex-nowrap scrollbar-none pb-2 -mb-2">
            <button
              class="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300"
              :class="!selectedCategory
                ? 'bg-[#e94560] text-white border-[#e94560]'
                : 'text-white/50 border-white/10 hover:text-white hover:border-white/20'"
              @click="selectCategory('')"
            >
              全部 {{ categories.reduce((s,c) => s + c.count, 0) }}
            </button>
            <button
              v-for="cat in categories"
              :key="cat.name"
              ref="catBtnsRef"
              class="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300"
              :class="selectedCategory === cat.name
                ? 'bg-[#e94560] text-white border-[#e94560]'
                : 'text-white/50 border-white/10 hover:text-white hover:border-white/20'"
              @click="selectCategory(cat.name)"
            >
              {{ cat.name.replace(/^\d+-/, '') }} {{ cat.count }}
            </button>
          </div>
          </div>
        </div>

        <!-- Loading skeleton -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div v-for="n in 8" :key="n" class="rounded-2xl bg-white/[0.03] animate-pulse border border-white/5" :style="{ height: n % 5 === 0 ? '320px' : '200px' }" />
        </div>

        <!-- Sound bento grid -->
        <SoundBento v-else :cards="bentoCards" :active-id="player.playingId.value || ''" />

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-12 flex justify-center items-center gap-3">
          <button
            :disabled="page === 1"
            class="px-5 py-2.5 rounded-full text-sm font-semibold border border-white/10 text-white/60 hover:text-white hover:border-white/20 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            @click="page--; fetchSounds(); nextTick(scrollToSounds)"
          >
            <Icon name="arrow-left" class="w-4 h-4" />
          </button>
          <span class="text-xs text-white/30 px-3">{{ page }} / {{ totalPages }}</span>
          <button
            :disabled="page >= totalPages"
            class="px-5 py-2.5 rounded-full text-sm font-semibold border border-white/10 text-white/60 hover:text-white hover:border-white/20 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            @click="page++; fetchSounds(); nextTick(scrollToSounds)"
          >
            <Icon name="arrow-right" class="w-4 h-4" />
          </button>
        </div>

        <!-- Empty state -->
        <div v-if="!loading && !bentoCards.length" class="text-center py-20">
          <Icon name="magnifying-glass" class="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p class="text-white/30 text-lg">没有找到匹配的音效</p>
        </div>
      </div>
    </section>

    <!-- Recently played -->
    <section v-if="recentSounds.length" class="relative py-20 sm:py-28" style="background: #0c0c14;">
      <div class="max-w-7xl mx-auto px-5">
        <p class="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-white/30 font-semibold mb-3">
          继续聆听
        </p>
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-10">最近播放</h2>
        <div class="flex gap-3 overflow-x-auto pb-4 -mx-1 px-1 scrollbar-none">
          <div
            v-for="sound in recentSounds"
            :key="sound.id"
            class="flex-shrink-0 w-40 sm:w-48 rounded-2xl overflow-hidden border border-white/5 group cursor-pointer transition-all duration-500 hover:scale-[1.03]"
            style="background: #1a1a24;"
            @click="playSound(sound)"
          >
            <div class="h-24 sm:h-28 bg-gradient-to-br from-[#e94560]/20 to-purple-500/10 flex items-center justify-center relative overflow-hidden">
              <span class="text-3xl opacity-30">#</span>
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="w-10 h-10 rounded-full bg-[#e94560]/90 flex items-center justify-center shadow-lg shadow-[#e94560]/30">
                  <Icon name="play" class="w-4 h-4 text-white ml-0.5" />
                </div>
              </div>
            </div>
            <div class="p-3">
              <p class="text-xs text-white/80 font-medium line-clamp-1">{{ sound.name }}</p>
              <p class="text-[10px] text-white/30 mt-0.5">{{ sound.category }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter
      ctaTitle="准备好让你的车与众不同了吗？"
      ctaDesc="数千款精选音效与壁纸，完全免费在线试听下载。"
      @cta="scrollToSounds"
      @feedback="showFeedback = true"
    />

    <!-- Feedback modal -->
    <FeedbackModal v-model="showFeedback" />

    <!-- AppFab -->
    <AppFab :playerActive="!!player.currentSound.value" />

    <!-- Audio player -->
    <AudioPlayer
      :sound="player.currentSound.value"
      :is-playing="!!player.playingId.value"
      :progress="player.progress.value"
      :time-display="player.timeDisplay.value"
      :buffered="player.buffered.value"
      :auto-play="autoPlay"
      @close="player.stop()"
      @seek="(v: number) => player.seek(v)"
      @prev="playPrev"
      @next="playNext"
      @pause="player.play(player.currentSound.value!)"
      @resume="player.play(player.currentSound.value!)"
      @download="player.currentSound.value && handleDownload(player.currentSound.value)"
      @share="handleShare"
      @toggle-auto-play="autoPlay = !autoPlay"
    />
  </main>
</template>

<script setup lang="ts">
const player = useAudioPlayer()
const toast = useToast()
const search = ref('')
const page = ref(1)
const pageSize = 60
const loading = ref(false)
const autoPlay = ref(true)
const showFeedback = ref(false)
const selectedCategory = ref('')

const sounds = ref<any[]>([])
const totalPages = ref(0)
const categories = ref<{ name: string; count: number }[]>([])
const topTags = ref<string[]>([])
const catScrollRef = ref<HTMLElement | null>(null)
const catBtnsRef = ref<any>([])

function selectCategory(name: string) {
  if (selectedCategory.value === name) return  // already selected
  selectedCategory.value = name
  nextTick(() => {
    const container = catScrollRef.value
    if (!container) return
    if (!name) { container.scrollTo({ left: 0, behavior: 'smooth' }); return }
    const i = categories.value.findIndex(c => c.name === name)
    const btn = catBtnsRef.value[i]
    if (btn) {
      const scrollLeft = Math.max(0, btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2)
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  })
}

interface BentoCard {
  id: string | number
  title: string
  subtitle?: string
  image?: string
  icon?: string
  badge?: string
  badgeColor?: string
  stat?: string
  statLabel?: string
  bg?: string
  colSpan?: number
  rowSpan?: number
  playable?: boolean
  onClick?: () => void
}

const bentoCards = computed<BentoCard[]>(() => {
  const catColors: Record<string, string> = {
    '01-网络热梗': '#f59e0b',
    '02-动漫ACG': '#8b5cf6',
    '03-游戏音效': '#06b6d4',
    '04-影视剧场': '#e94560',
    '05-动物自然': '#22c55e',
    '06-汽车机械': '#f97316',
    '07-系统提示': '#6366f1',
    '08-纯音效氛围': '#14b8a6',
    '09-方言特色': '#ec4899',
    '10-锁车行车': '#e94560',
    '11-音乐BGM': '#a855f7',
    '12-角色语音包': '#3b82f6',
    '13-品牌开机': '#f43f5e',
  }

  return sounds.value.map((s: any, i: number) => {
    const colSpan = i % 5 === 0 ? 2 : i % 7 === 3 ? 2 : 1
    const rowSpan = i % 9 === 0 ? 2 : 1
    const cat = s.category || ''
    const color = catColors[cat] || '#e94560'

    return {
      id: s.id,
      title: s.name,
      subtitle: `${cat} · ${s.size || ''} · ${s.duration || '00:00'}`,
      badge: cat.replace(/^\d+-/, ''),
      badgeColor: color,
      bg: `${color}10`,
      colSpan,
      rowSpan,
      playable: true,
      onClick: () => { autoPlay.value = true; player.play(s) },
    } satisfies BentoCard
  })
})

async function fetchSounds() {
  loading.value = true
  try {
    const params = new URLSearchParams({
      page: String(page.value),
      pageSize: String(pageSize),
    })
    if (search.value) params.set('search', search.value)
    if (selectedCategory.value) params.set('category', selectedCategory.value)

    const data = await $fetch<any>(`/api/sounds?${params}`)
    sounds.value = data.items
    totalPages.value = data.totalPages
  } catch { sounds.value = [] } finally { loading.value = false }
}

async function fetchCategories() {
  try {
    const data = await $fetch<any>('/api/categories')
    categories.value = data
    topTags.value = data.slice(0, 10).map((c: any) => c.name.replace(/^\d+-/, ''))
  } catch { /* silent */ }
}

function loadRecent() {
  try {
    const raw = localStorage.getItem('recent-sounds')
    if (raw) recentSounds.value = JSON.parse(raw)
  } catch { /* silent */ }
}

const recentSounds = ref<any[]>([])

function playSound(sound: any) {
  autoPlay.value = true
  player.play(sound)
  const existing = recentSounds.value.filter((s: any) => s.id !== sound.id)
  existing.unshift(sound)
  recentSounds.value = existing.slice(0, 20)
  localStorage.setItem('recent-sounds', JSON.stringify(recentSounds.value))
}

function playPrev() {
  const idx = sounds.value.findIndex((s: any) => s.id === player.currentSound.value?.id)
  if (idx > 0) playSound(sounds.value[idx - 1])
}

function playNext() {
  const idx = sounds.value.findIndex((s: any) => s.id === player.currentSound.value?.id)
  if (idx < sounds.value.length - 1) playSound(sounds.value[idx + 1])
}

async function handleDownload(sound: any) {
  const url = player.getAudioUrl(sound)
  toast.success('开始下载...')
  const a = document.createElement('a')
  a.href = url
  a.download = sound.file
  a.click()
}

function handleShare() {
  const s = player.currentSound.value
  if (!s) return
  const text = `${s.name} - ${s.category}\n\n来自锁车音效分享平台 lock.mooon.vip`
  void navigator.clipboard.writeText(text).then(() => toast.success('已复制分享文案'))
}

function scrollToSounds() {
  document.getElementById('sounds')?.scrollIntoView({ behavior: 'smooth' })
}

watch([search], () => { page.value = 1; fetchSounds() })
watch(selectedCategory, () => { page.value = 1; fetchSounds() })

onMounted(() => {
  loadRecent()
  fetchCategories()
  fetchSounds()
  player.onAutoNext = () => playAdjacent(1)
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  player.stop()
  window.removeEventListener('keydown', onKeydown)
})

function playAdjacent(offset: number) {
  if (!player.currentSound.value) return
  const idx = sounds.value.findIndex((s: any) => s.id === player.currentSound.value?.id)
  const next = sounds.value[idx + offset]
  if (next) playSound(next)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === ' ') {
    e.preventDefault()
    if (player.playingId.value) { player.stop() }
    else if (player.currentSound.value) { player.play(player.currentSound.value) }
  }
  if (e.key === 'ArrowLeft') player.seek(Math.max(0, player.progress.value - 5))
  if (e.key === 'ArrowRight') player.seek(Math.min(100, player.progress.value + 5))
}

useSeoMeta({
  title: '锁车音效分享平台',
  description: '海量个性锁车音效免费在线试听下载',
  ogTitle: '锁车音效分享平台',
  ogDescription: '海量个性锁车音效免费在线试听下载',
})
</script>
