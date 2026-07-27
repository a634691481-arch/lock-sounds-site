<template>
  <div
    class="min-h-screen relative"
    style="background: linear-gradient(135deg,#fef2f2 0%,#fdf2f8 25%,#faf5ff 50%,#eff6ff 75%,#f0fdf4 100%)"
  >
    <AppFab @feedback="showFeedback = true" />

    <!-- Decorative blobs -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-pink-300/20 blur-3xl" />
      <div class="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-purple-300/15 blur-3xl" />
      <div class="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-amber-200/15 blur-3xl" />
      <div class="absolute top-2/3 left-1/3 w-72 h-72 rounded-full bg-emerald-300/12 blur-3xl" />
    </div>

    <!-- Glass header -->
    <header class="glass sticky top-0 z-50 border-b border-white/30">
      <div class="max-w-6xl mx-auto px-5 py-3">
        <div class="flex items-center gap-2 mb-3 overflow-hidden">
          <span class="text-3xl flex-shrink-0">🖼️</span>
          <h1 class="text-xl sm:text-2xl font-playful tracking-tight flex-1 min-w-0 truncate">
            <NuxtLink to="/" class="text-[#e94560] no-underline hover:opacity-80 transition-opacity">锁车音效</NuxtLink>
            <span class="text-slate-500 text-sm sm:text-lg ml-1 font-normal">分享平台</span>
            <span class="hidden sm:inline text-amber-600 text-sm ml-3 font-normal whitespace-nowrap">— 川A·BQ0326 路上看到请滴滴，车友是一家</span>
          </h1>
          <NuxtLink to="/" class="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/70 hover:bg-[#e94560] hover:text-white text-slate-600 text-xs sm:text-sm font-semibold no-underline transition-all duration-200 shadow-sm whitespace-nowrap">
            <Icon name="play" class="w-4 h-4" />车机音频
          </NuxtLink>
        </div>
        <div class="relative">
          <Icon name="magnifying-glass" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            v-model="search"
            type="text"
            placeholder="搜索壁纸..."
            class="w-full pl-12 pr-5 py-3.5 bg-white rounded-2xl border-2 border-slate-200 outline-none text-slate-700 text-base placeholder:text-slate-400 shadow-[0_2px_12px_rgba(0,0,0,0.06)] focus:border-[#e94560] focus:shadow-[0_4px_20px_rgba(233,69,96,0.15)] transition-all duration-200"
          />
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-5 relative z-10">
      <WallpaperGrid :search="search" />
    </main>

    <footer class="max-w-6xl mx-auto px-5 pb-8 pt-4 text-center text-xs text-slate-400 relative z-10">
      <p>车机壁纸分享平台 &copy; {{ new Date().getFullYear() }} — 高清车机壁纸免费在线预览下载</p>
      <p class="mt-1"><span id="busuanzi_value_site_pv"></span> 次访问 · <span id="busuanzi_value_site_uv"></span> 位访客 · 今日 <span id="busuanzi_value_today_pv"></span></p>
    </footer>

    <FeedbackModal v-model="showFeedback" />
  </div>
</template>

<script setup lang="ts">
const search = ref('')
const showFeedback = ref(false)

useSeoMeta({
  title: '车机壁纸分享平台 - 高清车机壁纸免费在线预览下载',
  description: '车机壁纸分享平台，收录高清车机壁纸。在线预览、免费下载，涵盖动漫、人物、自然景色等多种分类。',
  ogTitle: '车机壁纸分享平台',
  ogDescription: '高清车机壁纸免费在线预览下载',
  ogType: 'website',
})
</script>
