<template>
  <main class="min-h-screen bg-[#09090b]">
    <AppNav />

    <div class="max-w-7xl mx-auto px-5 pt-32 pb-24">
      <div class="flex items-center justify-between mb-10">
        <div>
          <h1 class="text-2xl font-bold text-white mb-1">数据统计</h1>
          <p class="text-sm text-white/30">站点数据一览</p>
        </div>
        <button
          class="px-4 py-2 rounded-full text-xs font-medium border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all"
          :disabled="loading"
          @click="refresh"
        >
          <span v-if="loading" class="inline-flex items-center gap-1.5">
            <span class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            刷新中
          </span>
          <span v-else>刷新</span>
        </button>
      </div>

      <!-- Loading -->
      <template v-if="loading && !stats">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div v-for="n in 4" :key="n" class="bg-white/[0.03] rounded-2xl p-5 border border-white/5 animate-pulse">
            <div class="h-3 w-12 bg-white/10 rounded mb-3" />
            <div class="h-8 w-20 bg-white/10 rounded" />
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div v-for="n in 4" :key="n" class="bg-white/[0.03] rounded-2xl p-5 border border-white/5 animate-pulse">
            <div class="h-3 w-24 bg-white/10 rounded mb-3" />
            <div class="space-y-2"><div v-for="m in 5" :key="m" class="h-4 bg-white/5 rounded" /></div>
          </div>
        </div>
      </template>

      <template v-else-if="stats">
        <!-- KPI cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div class="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/5 p-5">
            <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#e94560] to-[#e94560]/20" />
            <p class="text-white/30 text-[10px] uppercase tracking-wider mb-2">今日 PV</p>
            <p class="text-white text-[clamp(1.5rem,3vw,2.2rem)] font-bold tabular-nums leading-none">{{ stats.pv_today }}</p>
          </div>
          <div class="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/5 p-5">
            <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#a855f7] to-[#a855f7]/20" />
            <p class="text-white/30 text-[10px] uppercase tracking-wider mb-2">累计 PV</p>
            <p class="text-white text-[clamp(1.5rem,3vw,2.2rem)] font-bold tabular-nums leading-none">{{ stats.pv_total }}</p>
          </div>
          <div class="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/5 p-5">
            <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#22c55e] to-[#22c55e]/20" />
            <p class="text-white/30 text-[10px] uppercase tracking-wider mb-2">今日播放</p>
            <p class="text-white text-[clamp(1.5rem,3vw,2.2rem)] font-bold tabular-nums leading-none">{{ stats.today_summary?.sound_play || 0 }}</p>
          </div>
          <div class="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/5 p-5">
            <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#f59e0b] to-[#f59e0b]/20" />
            <p class="text-white/30 text-[10px] uppercase tracking-wider mb-2">今日下载</p>
            <p class="text-white text-[clamp(1.5rem,3vw,2.2rem)] font-bold tabular-nums leading-none">{{ (stats.today_summary?.sound_download || 0) + (stats.today_summary?.wallpaper_download || 0) }}</p>
          </div>
        </div>

        <!-- Hourly chart -->
        <div v-if="stats.hourly" class="rounded-2xl bg-white/[0.03] border border-white/5 p-5 mb-6">
          <div class="flex items-center justify-between mb-4">
            <p class="text-white/30 text-[10px] uppercase tracking-wider">今日趋势</p>
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1.5 text-[10px] text-white/40"><span class="w-2 h-2 rounded-sm bg-[#e94560]/80" /> 浏览</span>
              <span class="flex items-center gap-1.5 text-[10px] text-white/40"><span class="w-2 h-2 rounded-sm bg-white/20" /> 播放</span>
            </div>
          </div>
          <div class="flex items-end gap-[2px] h-28">
            <div
              v-for="(count, i) in stats.hourly.pageview"
              :key="i"
              class="flex-1 flex flex-col-reverse"
              :title="`${i}时 浏览${count} 播放${stats.hourly.play[i]}`"
            >
              <div class="w-full rounded-t-[2px] bg-white/10" :style="{ height: maxCount ? (stats.hourly.play[i] / maxCount) * 100 + '%' : '0%' }" />
              <div class="w-full rounded-t-[2px] bg-[#e94560]/70" :style="{ height: maxCount ? (count / maxCount) * 100 + '%' : '0%' }" />
            </div>
          </div>
          <div class="flex justify-between mt-2 text-[9px] text-white/15">
            <span v-for="h in [0,3,6,9,12,15,18,21]" :key="h">{{ h }}时</span>
          </div>
        </div>

        <!-- Summary tags -->
        <div v-if="stats.today_summary && Object.keys(stats.today_summary).length >= 2" class="rounded-2xl bg-white/[0.03] border border-white/5 p-5 mb-6">
          <p class="text-white/30 text-[10px] uppercase tracking-wider mb-3">今日事件</p>
          <div class="flex flex-wrap gap-2">
            <span v-if="stats.today_summary.pageview" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] text-white/60">
              <span class="w-1.5 h-1.5 rounded-full bg-[#e94560]" /> 浏览 {{ stats.today_summary.pageview }}
            </span>
            <span v-if="stats.today_summary.sound_play" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] text-white/60">
              <span class="w-1.5 h-1.5 rounded-full bg-green-400" /> 播放 {{ stats.today_summary.sound_play }}
            </span>
            <span v-if="stats.today_summary.sound_download" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] text-white/60">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400" /> 音效下载 {{ stats.today_summary.sound_download }}
            </span>
            <span v-if="stats.today_summary.sound_share" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] text-white/60">
              <span class="w-1.5 h-1.5 rounded-full bg-sky-400" /> 分享 {{ stats.today_summary.sound_share }}
            </span>
            <span v-if="stats.today_summary.wallpaper_view" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] text-white/60">
              <span class="w-1.5 h-1.5 rounded-full bg-violet-400" /> 壁纸浏览 {{ stats.today_summary.wallpaper_view }}
            </span>
            <span v-if="stats.today_summary.wallpaper_download" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] text-white/60">
              <span class="w-1.5 h-1.5 rounded-full bg-orange-400" /> 壁纸下载 {{ stats.today_summary.wallpaper_download }}
            </span>
            <span v-if="stats.today_summary.search" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] text-white/60">
              <span class="w-1.5 h-1.5 rounded-full bg-white/40" /> 搜索 {{ stats.today_summary.search }}
            </span>
          </div>
        </div>

        <!-- Top lists -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <TopCard v-if="stats.top_plays?.length" title="热门播放 Top 10" :items="stats.top_plays" @click="go('/?search=' + encodeURIComponent($event))" />
          <TopCard v-if="stats.top_downloads?.length" title="热门下载 Top 10" :items="stats.top_downloads" @click="go('/?search=' + encodeURIComponent($event))" />
          <TopCard v-if="stats.top_wallpaper_views?.length" title="热门壁纸 Top 10" :items="stats.top_wallpaper_views" @click="go('/wallpapers?search=' + encodeURIComponent($event))" />
          <TopCard v-if="stats.top_wallpaper_downloads?.length" title="壁纸下载 Top 10" :items="stats.top_wallpaper_downloads" @click="go('/wallpapers?search=' + encodeURIComponent($event))" />
        </div>

        <!-- Hot searches -->
        <div v-if="stats.top_searches?.length" class="rounded-2xl bg-white/[0.03] border border-white/5 p-5">
          <p class="text-white/30 text-[10px] uppercase tracking-wider mb-3">热门搜索 Top 15</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(item, i) in stats.top_searches"
              :key="item.query"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-white/50 hover:text-white hover:border-white/15 hover:bg-white/[0.08] cursor-pointer transition-all"
              @click="go('/?search=' + encodeURIComponent(item.query))"
            >
              <span :class="i < 3 ? (['text-amber-300','text-white/15','text-amber-600'][i]) : 'text-white/15'" class="tabular-nums font-mono text-[10px]">{{ i + 1 }}</span>
              {{ item.query }}
              <span class="text-white/15 text-[10px]">{{ item.count }}</span>
            </span>
          </div>
        </div>
      </template>

      <!-- Error -->
      <div v-else class="text-center py-20">
        <Icon name="exclamation-triangle" class="w-10 h-10 text-white/10 mx-auto mb-4" />
        <p class="text-white/30 text-lg mb-4">加载失败</p>
        <button class="px-6 py-2.5 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-white/60 hover:text-white transition-all" @click="load">重试</button>
      </div>
    </div>

    <AppFooter />
  </main>
</template>

<script setup lang="ts">
interface StatsItem { id: string; name: string; count: number }

interface Stats {
  pv_today: number
  pv_total: number
  top_plays: StatsItem[]
  top_downloads: StatsItem[]
  top_wallpaper_views: StatsItem[]
  top_wallpaper_downloads: StatsItem[]
  top_searches: { query: string; count: number }[]
  today_summary: Record<string, number>
  hourly: { labels: string[]; pageview: number[]; play: number[] }
}

const stats = ref<Stats | null>(null)
const loading = ref(false)

const currentHour = computed(() => new Date().getHours())
const maxCount = computed(() => {
  if (!stats.value?.hourly) return 0
  return Math.max(1, ...stats.value.hourly.pageview, ...stats.value.hourly.play)
})

async function load() {
  loading.value = true
  try { stats.value = await $fetch<Stats>('/api/stats') } catch { stats.value = null }
  loading.value = false
}

function refresh() {
  if (loading.value) return
  load()
}

function go(url: string) { navigateTo(url) }

useSeoMeta({ title: '数据统计 - 锁车音效' })
onMounted(() => load())
</script>
