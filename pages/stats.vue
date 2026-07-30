<template>
  <main class="min-h-screen bg-[#09090b]">
    <AppNav />

    <div class="max-w-4xl mx-auto px-5 pt-32 pb-24">
      <div class="flex items-center justify-between mb-10">
        <div>
          <h1 class="text-2xl font-bold text-white mb-1">数据统计</h1>
          <p class="text-sm text-white/30">站点数据实时一览</p>
        </div>
        <button
          class="px-4 py-2 rounded-full text-xs font-medium border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all"
          @click="refresh"
        >
          <span v-if="loading" class="inline-flex items-center gap-1.5">
            <span class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            刷新中
          </span>
          <span v-else>刷新</span>
        </button>
      </div>

      <!-- Loading skeleton -->
      <template v-if="loading && !stats">
        <div class="grid grid-cols-2 gap-3 mb-8">
          <div v-for="n in 2" :key="n" class="bg-white/5 rounded-xl p-4 animate-pulse">
            <div class="h-3 w-16 bg-white/10 rounded mb-3" />
            <div class="h-8 w-24 bg-white/10 rounded" />
          </div>
        </div>
        <div v-for="n in 4" :key="n" class="bg-white/5 rounded-xl p-4 mb-4 animate-pulse">
          <div class="h-3 w-24 bg-white/10 rounded mb-3" />
          <div class="h-16 bg-white/5 rounded" />
        </div>
      </template>

      <template v-else-if="stats">
        <!-- PV -->
        <div class="grid grid-cols-2 gap-3 mb-8">
          <div class="bg-white/5 rounded-xl p-4">
            <p class="text-white/30 text-[10px] uppercase tracking-wider mb-1">今日 PV</p>
            <p class="text-white text-2xl font-bold tabular-nums">{{ stats.pv_today }}</p>
          </div>
          <div class="bg-white/5 rounded-xl p-4">
            <p class="text-white/30 text-[10px] uppercase tracking-wider mb-1">累计 PV</p>
            <p class="text-white text-2xl font-bold tabular-nums">{{ stats.pv_total }}</p>
          </div>
        </div>

        <!-- Today summary -->
        <div v-if="stats.today_summary && Object.keys(stats.today_summary).length" class="bg-white/5 rounded-xl p-4 mb-6">
          <p class="text-white/30 text-[10px] uppercase tracking-wider mb-3">今日事件汇总</p>
          <div class="flex flex-wrap gap-x-4 gap-y-1.5">
            <span v-if="stats.today_summary.pageview" class="text-white/70 text-xs">浏览 {{ stats.today_summary.pageview }} 次</span>
            <span v-if="stats.today_summary.sound_play" class="text-white/70 text-xs">播放 {{ stats.today_summary.sound_play }} 次</span>
            <span v-if="stats.today_summary.sound_download" class="text-white/70 text-xs">音效下载 {{ stats.today_summary.sound_download }} 次</span>
            <span v-if="stats.today_summary.sound_share" class="text-white/70 text-xs">分享 {{ stats.today_summary.sound_share }} 次</span>
            <span v-if="stats.today_summary.wallpaper_view" class="text-white/70 text-xs">壁纸浏览 {{ stats.today_summary.wallpaper_view }} 次</span>
            <span v-if="stats.today_summary.wallpaper_download" class="text-white/70 text-xs">壁纸下载 {{ stats.today_summary.wallpaper_download }} 次</span>
            <span v-if="stats.today_summary.search" class="text-white/70 text-xs">搜索 {{ stats.today_summary.search }} 次</span>
          </div>
        </div>

        <!-- Hourly chart -->
        <div v-if="stats.hourly" class="bg-white/5 rounded-xl p-4 mb-6">
          <p class="text-white/30 text-[10px] uppercase tracking-wider mb-3">今日趋势</p>
          <div class="flex items-end gap-[2px] h-24">
            <div
              v-for="(count, i) in stats.hourly.pageview"
              :key="i"
              class="flex-1 rounded-t"
              :class="i <= currentHour ? 'bg-[#e94560]/60' : 'bg-white/5'"
              :style="{ height: maxCount ? (count / maxCount) * 100 + '%' : '0%' }"
              :title="`${i}时: 浏览${count} 播放${stats.hourly.play[i]}`"
            />
          </div>
          <div class="flex justify-between mt-1.5 text-[9px] text-white/20">
            <span>0时</span><span>6时</span><span>12时</span><span>18时</span><span>23时</span>
          </div>
        </div>

        <!-- Hot plays -->
        <div v-if="stats.top_plays?.length" class="bg-white/5 rounded-xl p-4 mb-4">
          <p class="text-white/30 text-[10px] uppercase tracking-wider mb-3">热门播放 Top 10（累计）</p>
          <div class="space-y-1.5">
            <div v-for="(item, i) in stats.top_plays" :key="item.id" class="flex items-center gap-2 text-xs cursor-pointer hover:bg-white/5 rounded px-1 py-0.5 -mx-1 transition-colors" @click="go('/?search=' + encodeURIComponent(item.name))">
              <span class="text-white/20 w-4 text-right tabular-nums flex-shrink-0">{{ i + 1 }}</span>
              <span class="text-white/80 truncate flex-1">{{ item.name }}</span>
              <span class="text-white/30 tabular-nums flex-shrink-0">{{ item.count }}</span>
            </div>
          </div>
        </div>

        <!-- Hot downloads -->
        <div v-if="stats.top_downloads?.length" class="bg-white/5 rounded-xl p-4 mb-4">
          <p class="text-white/30 text-[10px] uppercase tracking-wider mb-3">热门下载 Top 10（累计）</p>
          <div class="space-y-1.5">
            <div v-for="(item, i) in stats.top_downloads" :key="item.id" class="flex items-center gap-2 text-xs cursor-pointer hover:bg-white/5 rounded px-1 py-0.5 -mx-1 transition-colors" @click="go('/?search=' + encodeURIComponent(item.name))">
              <span class="text-white/20 w-4 text-right tabular-nums flex-shrink-0">{{ i + 1 }}</span>
              <span class="text-white/80 truncate flex-1">{{ item.name }}</span>
              <span class="text-white/30 tabular-nums flex-shrink-0">{{ item.count }}</span>
            </div>
          </div>
        </div>

        <!-- Hot wallpapers -->
        <div v-if="stats.top_wallpaper_views?.length" class="bg-white/5 rounded-xl p-4 mb-4">
          <p class="text-white/30 text-[10px] uppercase tracking-wider mb-3">热门壁纸 Top 10（累计）</p>
          <div class="space-y-1.5">
            <div v-for="(item, i) in stats.top_wallpaper_views" :key="item.id" class="flex items-center gap-2 text-xs cursor-pointer hover:bg-white/5 rounded px-1 py-0.5 -mx-1 transition-colors" @click="go('/wallpapers?search=' + encodeURIComponent(item.name))">
              <span class="text-white/20 w-4 text-right tabular-nums flex-shrink-0">{{ i + 1 }}</span>
              <span class="text-white/80 truncate flex-1">{{ item.name }}</span>
              <span class="text-white/30 tabular-nums flex-shrink-0">{{ item.count }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Error -->
      <div v-else class="text-center py-20">
        <p class="text-white/30 text-lg mb-4">数据加载失败</p>
        <button class="px-6 py-2.5 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-white/60 hover:text-white transition-all" @click="load">重新加载</button>
      </div>
    </div>

    <AppFooter />
  </main>
</template>

<script setup lang="ts">
interface Stats {
  pv_today: number
  pv_total: number
  top_plays: { id: string; name: string; count: number }[]
  top_downloads: { id: string; name: string; count: number }[]
  top_wallpaper_views: { id: string; name: string; count: number }[]
  top_wallpaper_downloads: { id: string; name: string; count: number }[]
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

function go(url: string) {
  navigateTo(url)
}

useSeoMeta({ title: '数据统计 - 锁车音效' })

onMounted(() => load())
</script>
