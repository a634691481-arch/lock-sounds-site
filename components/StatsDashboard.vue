<template>
  <Teleport to="body">
    <div class="fixed left-5 bottom-[144px] sm:bottom-[80px] z-[9000]">
      <!-- Floating button -->
      <button
        class="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#e94560] ring-4 ring-white/60 shadow-[0_4px_16px_rgba(233,69,96,0.5)] cursor-pointer text-white text-sm sm:text-lg hover:scale-110 hover:shadow-[0_8px_28px_rgba(233,69,96,0.6)] transition-all duration-300 ease-out flex items-center justify-center border-none"
        title="统计看板"
        @click="open"
      >
        <Icon name="chart-bar" class="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <!-- Panel -->
      <Transition name="panel">
        <div v-if="show" class="fixed inset-0 z-[9001]" @click.self="show = false">
          <div
            class="absolute bottom-0 left-0 sm:bottom-24 sm:left-5 w-full sm:w-[520px] max-h-[85vh] sm:max-h-[75vh] bg-[#111118] border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col"
          >
            <!-- Header -->
            <div class="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
              <div class="flex items-center gap-2">
                <span class="text-[#e94560]"><Icon name="chart-bar" class="w-5 h-5" /></span>
                <span class="text-white font-bold text-sm">数据统计</span>
                <span class="text-white/20 text-xs">实时</span>
              </div>
              <button class="bg-transparent border-none text-white/30 hover:text-white cursor-pointer p-1" @click="show = false">
                <Icon name="x-mark" class="w-4 h-4" />
              </button>
            </div>

            <!-- Content -->
            <div class="overflow-y-auto flex-1 px-5 py-4 space-y-5">
              <!-- PV -->
              <div class="grid grid-cols-2 gap-3">
                <div class="bg-white/5 rounded-xl p-4">
                  <p class="text-white/30 text-[10px] uppercase tracking-wider mb-1">今日 PV</p>
                  <p class="text-white text-2xl font-bold tabular-nums">{{ stats?.pv_today ?? '...' }}</p>
                </div>
                <div class="bg-white/5 rounded-xl p-4">
                  <p class="text-white/30 text-[10px] uppercase tracking-wider mb-1">累计 PV</p>
                  <p class="text-white text-2xl font-bold tabular-nums">{{ stats?.pv_total ?? '...' }}</p>
                </div>
              </div>

              <!-- Today summary -->
              <div v-if="stats?.today_summary && Object.keys(stats.today_summary).length" class="bg-white/5 rounded-xl p-4">
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
              <div v-if="stats?.hourly" class="bg-white/5 rounded-xl p-4">
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
              <div v-if="stats?.top_plays?.length" class="bg-white/5 rounded-xl p-4">
                <p class="text-white/30 text-[10px] uppercase tracking-wider mb-3">热门播放 Top 10 (7天)</p>
                <div class="space-y-1.5">
                  <div v-for="(item, i) in stats.top_plays" :key="item.id" class="flex items-center gap-2 text-xs">
                    <span class="text-white/20 w-4 text-right tabular-nums flex-shrink-0">{{ i + 1 }}</span>
                    <span class="text-white/80 truncate flex-1">{{ item.name }}</span>
                    <span class="text-white/30 tabular-nums flex-shrink-0">{{ item.count }}</span>
                  </div>
                </div>
              </div>

              <!-- Hot downloads -->
              <div v-if="stats?.top_downloads?.length" class="bg-white/5 rounded-xl p-4">
                <p class="text-white/30 text-[10px] uppercase tracking-wider mb-3">热门下载 Top 10 (7天)</p>
                <div class="space-y-1.5">
                  <div v-for="(item, i) in stats.top_downloads" :key="item.id" class="flex items-center gap-2 text-xs">
                    <span class="text-white/20 w-4 text-right tabular-nums flex-shrink-0">{{ i + 1 }}</span>
                    <span class="text-white/80 truncate flex-1">{{ item.name }}</span>
                    <span class="text-white/30 tabular-nums flex-shrink-0">{{ item.count }}</span>
                  </div>
                </div>
              </div>

              <!-- Hot wallpapers -->
              <div v-if="stats?.top_wallpaper_views?.length" class="bg-white/5 rounded-xl p-4">
                <p class="text-white/30 text-[10px] uppercase tracking-wider mb-3">热门壁纸 Top 10 (7天)</p>
                <div class="space-y-1.5">
                  <div v-for="(item, i) in stats.top_wallpaper_views" :key="item.id" class="flex items-center gap-2 text-xs">
                    <span class="text-white/20 w-4 text-right tabular-nums flex-shrink-0">{{ i + 1 }}</span>
                    <span class="text-white/80 truncate flex-1">{{ item.name }}</span>
                    <span class="text-white/30 tabular-nums flex-shrink-0">{{ item.count }}</span>
                  </div>
                </div>
              </div>

              <!-- Hot searches -->
              <div v-if="stats?.top_searches?.length" class="bg-white/5 rounded-xl p-4">
                <p class="text-white/30 text-[10px] uppercase tracking-wider mb-3">热门搜索 (7天)</p>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="(item, i) in stats.top_searches" :key="item.query" class="px-2.5 py-1 rounded-full text-xs" :class="i === 0 ? 'bg-[#e94560]/40 text-[#e94560]' : 'bg-white/5 text-white/50'">
                    {{ item.query }} <span class="opacity-50">×{{ item.count }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
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

const show = ref(false)
const stats = ref<Stats | null>(null)

const currentHour = computed(() => new Date().getHours())
const maxCount = computed(() => {
  if (!stats.value?.hourly) return 0
  return Math.max(1, ...stats.value.hourly.pageview, ...stats.value.hourly.play)
})

async function open() {
  show.value = true
  try {
    stats.value = await $fetch<Stats>('/api/stats')
  } catch { /* silent */ }
}
</script>

<style scoped>
.panel-enter-active { transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
.panel-leave-active { transition: all 0.2s ease-in; }
.panel-enter-from { opacity: 0; }
.panel-enter-from > div { opacity: 0; transform: translateY(40px) scale(0.95); }
.panel-leave-to { opacity: 0; }
.panel-leave-to > div { opacity: 0; transform: translateY(20px) scale(0.95); }
</style>