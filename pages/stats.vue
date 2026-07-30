<template>
  <main class="min-h-screen bg-[#09090b] overflow-x-hidden w-full max-w-full">
    <AppNav />

    <div class="max-w-7xl mx-auto px-5 pt-36 pb-24">
      <!-- Attention: KPI Hero -->
      <div class="mb-24 sm:mb-32">
        <p class="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/25 font-semibold mb-6">Statistics Overview</p>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 stagger-1">
          <div v-for="(card, i) in kpiCards" :key="i" class="group relative rounded-3xl overflow-hidden border border-white/[0.06] p-6 sm:p-8 transition-all duration-700 hover:scale-[1.02] hover:border-white/10" style="background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%);">
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" :style="{ background: `radial-gradient(circle at 50% 0%, ${card.glow} 0%, transparent 70%)` }" />
            <div class="relative z-10">
              <p class="text-[10px] tracking-[0.15em] uppercase font-medium mb-3" :style="{ color: card.accent }">{{ card.label }}</p>
              <p class="font-bold tabular-nums tracking-tight" :style="{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff' }">
                {{ card.value }}
              </p>
              <div class="mt-2 h-[2px] w-8 rounded-full" :style="{ background: card.accent }" />
            </div>
          </div>
        </div>
      </div>

      <!-- Interest: Chart + Summary Side-by-Side -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 mb-24 sm:mb-32" v-if="stats?.hourly">
        <!-- Chart: 3 cols -->
        <div class="lg:col-span-3 rounded-3xl border border-white/[0.06] p-6 sm:p-8" style="background: linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%);">
          <div class="flex items-end justify-between mb-8">
            <p class="text-[10px] tracking-[0.15em] uppercase text-white/25 font-semibold">今日趋势</p>
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1.5 text-[10px] text-white/30"><span class="w-2 h-2 rounded-[2px] bg-[#e94560]" /> 浏览</span>
              <span class="flex items-center gap-1.5 text-[10px] text-white/30"><span class="w-2 h-2 rounded-[2px] bg-white/15" /> 播放</span>
            </div>
          </div>
          <div class="flex items-end gap-[3px] h-[200px] sm:h-[240px]">
            <div v-for="(c, i) in stats.hourly.pageview" :key="i" class="flex-1 flex flex-col-reverse group cursor-pointer" :title="`${i}时 · 浏览 ${c} · 播放 ${stats.hourly.play[i]}`">
              <div class="w-full rounded-t-[2px] transition-colors duration-300 group-hover:!bg-white/25" :style="{ height: maxCount ? (stats.hourly.play[i] * 0.8 / maxCount) * 100 + '%' : '0%', background: '#ffffff15' }" />
              <div class="w-full rounded-t-[2px] transition-colors duration-300 group-hover:!bg-[#e94560]/90" :style="{ height: maxCount ? (c / maxCount) * 100 + '%' : '0%', background: 'rgba(233,69,96,0.6)' }" />
            </div>
          </div>
          <div class="flex justify-between mt-3 text-[9px] text-white/12 font-mono">
            <span v-for="h in [0,3,6,9,12,15,18,21]" :key="h">{{ h }}h</span>
          </div>
        </div>

        <!-- Summary: 2 cols -->
        <div class="lg:col-span-2 rounded-3xl border border-white/[0.06] p-6 sm:p-8 flex flex-col" style="background: linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%);">
          <p class="text-[10px] tracking-[0.15em] uppercase text-white/25 font-semibold mb-6">今日事件</p>
          <div class="flex-1 flex flex-col justify-center gap-3">
            <template v-if="stats.today_summary">
              <div v-for="ev in eventRows" :key="ev.key" v-if="ev.value" class="flex items-center justify-between group">
                <span class="flex items-center gap-2 text-xs text-white/40">
                  <span class="w-1.5 h-1.5 rounded-full" :style="{ background: ev.color }" />
                  {{ ev.label }}
                </span>
                <span class="text-xs text-white/70 tabular-nums font-medium">{{ ev.value }}</span>
              </div>
            </template>
            <div v-else class="text-white/20 text-xs">暂无数据</div>
          </div>
        </div>
      </div>

      <!-- Desire: Top Charts Grid -->
      <div class="mb-24 sm:mb-32">
        <p class="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/25 font-semibold mb-8">Top Rankings</p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <TopCard v-if="stats?.top_plays?.length" title="热门播放" accent="#e94560" :items="stats.top_plays" @click="go('/?search=' + encodeURIComponent($event))" />
          <TopCard v-if="stats?.top_downloads?.length" title="热门下载" accent="#a855f7" :items="stats.top_downloads" @click="go('/?search=' + encodeURIComponent($event))" />
          <TopCard v-if="stats?.top_wallpaper_views?.length" title="热门壁纸" accent="#22c55e" :items="stats.top_wallpaper_views" @click="go('/wallpapers?search=' + encodeURIComponent($event))" />
          <TopCard v-if="stats?.top_wallpaper_downloads?.length" title="壁纸下载" accent="#f59e0b" :items="stats.top_wallpaper_downloads" @click="go('/wallpapers?search=' + encodeURIComponent($event))" />
        </div>
      </div>

      <!-- Action: Search Cloud -->
      <div v-if="stats?.top_searches?.length" class="mb-24 sm:mb-32">
        <p class="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/25 font-semibold mb-8">热门搜索</p>
        <div class="flex flex-wrap gap-2 sm:gap-3">
          <span
            v-for="(item, i) in stats.top_searches.slice(0, 20)"
            :key="item.query"
            class="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-500 cursor-pointer"
            :class="i < 3 ? 'border-white/15 hover:border-white/25' : 'border-white/[0.04] hover:border-white/10'"
            :style="i < 3 ? { background: 'rgba(255,255,255,0.04)' } : { background: 'rgba(255,255,255,0.01)' }"
            @click="go('/?search=' + encodeURIComponent(item.query))"
          >
            <span class="text-[10px] tabular-nums w-4 text-right" :class="i < 3 ? 'text-[#e94560]' : 'text-white/15'">{{ i + 1 }}</span>
            <span class="text-xs" :class="i < 3 ? 'text-white/60' : 'text-white/30'">{{ item.query }}</span>
            <span class="text-[10px] text-white/10 tabular-nums">{{ item.count }}</span>
          </span>
        </div>
      </div>

      <!-- Loading -->
      <template v-if="loading && !stats">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-24">
          <div v-for="n in 4" :key="n" class="rounded-3xl border border-white/[0.04] p-8 animate-pulse" style="background: rgba(255,255,255,0.01)">
            <div class="h-3 w-16 bg-white/[0.04] rounded mb-4" />
            <div class="h-10 w-20 bg-white/[0.02] rounded" />
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 rounded-3xl border border-white/[0.04] p-8 animate-pulse" style="background: rgba(255,255,255,0.01); aspect-ratio: 2/1" />
          <div class="rounded-3xl border border-white/[0.04] p-8 animate-pulse" style="background: rgba(255,255,255,0.01)" />
        </div>
      </template>

      <!-- Error -->
      <div v-if="!loading && !stats" class="text-center py-32">
        <div class="w-16 h-16 rounded-2xl border border-white/[0.05] flex items-center justify-center mx-auto mb-6" style="background: rgba(255,255,255,0.02)">
          <Icon name="exclamation-triangle" class="w-6 h-6 text-white/15" />
        </div>
        <p class="text-white/25 text-lg mb-6">加载失败</p>
        <button class="px-8 py-3 rounded-full text-sm font-medium border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all duration-500" @click="load">重新加载</button>
      </div>
    </div>

    <AppFooter />
  </main>
</template>

<script setup lang="ts">
interface StatsItem { id: string; name: string; count: number }

interface Stats {
  pv_today: number; pv_total: number
  top_plays: StatsItem[]; top_downloads: StatsItem[]
  top_wallpaper_views: StatsItem[]; top_wallpaper_downloads: StatsItem[]
  top_searches: { query: string; count: number }[]
  today_summary: Record<string, number>
  hourly: { labels: string[]; pageview: number[]; play: number[] }
}

const stats = ref<Stats | null>(null)
const loading = ref(false)

const kpiCards = computed(() => [
  { label: '今日 PV', value: stats.value?.pv_today ?? '...', accent: '#e94560', glow: 'rgba(233,69,96,0.08)' },
  { label: '累计 PV', value: stats.value?.pv_total ?? '...', accent: '#a855f7', glow: 'rgba(168,85,247,0.08)' },
  { label: '今日播放', value: stats.value?.today_summary?.sound_play ?? 0, accent: '#22c55e', glow: 'rgba(34,197,94,0.08)' },
  { label: '今日下载', value: (stats.value?.today_summary?.sound_download ?? 0) + (stats.value?.today_summary?.wallpaper_download ?? 0), accent: '#f59e0b', glow: 'rgba(245,158,11,0.08)' },
])

const eventRows = computed(() => {
  const s = stats.value?.today_summary
  if (!s) return []
  return [
    { key: 'pageview', label: '浏览', value: s.pageview, color: '#e94560' },
    { key: 'sound_play', label: '播放', value: s.sound_play, color: '#22c55e' },
    { key: 'sound_download', label: '音效下载', value: s.sound_download, color: '#f59e0b' },
    { key: 'sound_share', label: '分享', value: s.sound_share, color: '#0ea5e9' },
    { key: 'wallpaper_view', label: '壁纸浏览', value: s.wallpaper_view, color: '#a855f7' },
    { key: 'wallpaper_download', label: '壁纸下载', value: s.wallpaper_download, color: '#f97316' },
    { key: 'search', label: '搜索', value: s.search, color: '#ffffff40' },
  ].filter(e => e.value > 0)
})

const maxCount = computed(() => {
  if (!stats.value?.hourly) return 0
  return Math.max(1, ...stats.value.hourly.pageview, ...stats.value.hourly.play.map((v: number) => v * 0.8))
})

async function load() {
  loading.value = true
  try { stats.value = await $fetch<Stats>('/api/stats') } catch { stats.value = null }
  loading.value = false
}

function go(url: string) { navigateTo(url) }

useSeoMeta({ title: '数据统计 - LockSounds' })
onMounted(() => load())
</script>

<style scoped>
.stagger-1 > div { opacity: 0; animation: fadeUp 0.6s ease-out forwards; }
.stagger-1 > div:nth-child(1) { animation-delay: 0s; }
.stagger-1 > div:nth-child(2) { animation-delay: 0.08s; }
.stagger-1 > div:nth-child(3) { animation-delay: 0.16s; }
.stagger-1 > div:nth-child(4) { animation-delay: 0.24s; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
