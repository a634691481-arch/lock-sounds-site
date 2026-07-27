<template>
  <div
    class="min-h-screen relative"
    style="background: linear-gradient(135deg,#fef2f2 0%,#fdf2f8 25%,#faf5ff 50%,#eff6ff 75%,#f0fdf4 100%)"
  >
    <!-- Scroll progress bar -->
    <div class="fixed top-0 left-0 z-[300] h-1" :style="{ width: scrollProgress + '%', background: 'linear-gradient(90deg, #e94560, #f59e0b, #eab308, #22c55e, #06b6d4, #8b5cf6, #e94560)', backgroundSize: '200% 100%', animation: 'rainbow 2s linear infinite' }" />
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
        <div class="flex items-center gap-3 mb-3">
          <span class="text-3xl">🖼️</span>
          <h1 class="text-2xl font-playful tracking-tight">
            <NuxtLink to="/" class="text-[#e94560] no-underline hover:opacity-80 transition-opacity">锁车音效</NuxtLink>
            <span class="text-slate-500 text-lg ml-1 font-normal">分享平台</span>
          </h1>
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

    <main class="max-w-6xl mx-auto px-5 relative z-10 py-4">
      <WallpaperGrid :search="search" />
    </main>

    <footer class="max-w-6xl mx-auto px-5 pb-8 pt-4 text-center text-xs text-slate-400 relative z-10">
      <p>车机壁纸分享平台 &copy; {{ new Date().getFullYear() }} — 高清车机壁纸免费在线预览下载</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const search = ref('')
const scrollProgress = ref(0)

useSeoMeta({
  title: '车机壁纸分享平台 - 高清车机壁纸免费在线预览下载',
  description: '车机壁纸分享平台，收录高清车机壁纸。在线预览、免费下载，涵盖动漫、人物、自然景色等多种分类。',
  ogTitle: '车机壁纸分享平台',
  ogDescription: '高清车机壁纸免费在线预览下载',
  ogType: 'website',
})

function updateScrollProgress() {
  const h = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = h > 0 ? (window.scrollY / h) * 100 : 0
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})
</script>

<style>
@keyframes rainbow {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
</style>
