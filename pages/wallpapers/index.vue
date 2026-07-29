<template>
  <main class="overflow-x-hidden w-full max-w-full bg-[#09090b]">
    <AppNav />

    <!-- Hero -->
    <HeroSection
      title="为你的车机，换上新装"
      overline="Wallpaper Collection"
      subtitle="收录412+张高清车机壁纸，涵盖动漫卡通、文字壁纸、自然景色等7个分类，免费在线预览下载。"
      :showCtas="true"
      ctaPrimary="浏览壁纸"
      ctaPrimaryHref="#wallpapers"
      ctaSecondary="回到音效"
      ctaSecondaryHref="/"
      bgColor="#09090b"
      glowColor="#8b5cf630"
    />

    <!-- Category marquee -->
    <InfiniteMarquee
      v-if="topCategories.length"
      :items="topCategories"
      :speed="35"
      bg="#0c0c14"
      textColor="#ffffff10"
      dotColor="#8b5cf640"
    />

    <!-- Wallpapers section -->
    <section id="wallpapers" class="relative py-24 sm:py-32" style="background: #09090b;">
      <div class="max-w-7xl mx-auto px-5">
        <div class="mb-12">
          <p class="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-white/30 font-semibold mb-4">
            Wallpaper Collection
          </p>

          <!-- Search -->
          <div class="relative mb-6">
            <Icon name="magnifying-glass" class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
            <input
              v-model="search"
              type="text"
              placeholder="搜索壁纸..."
              class="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/15 focus:border-[#e94560]/50 transition-colors"
            />
            <button
              v-if="search"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              @click="search = ''"
            >
              <Icon name="x-mark" class="w-3 h-3 text-white/40" />
            </button>
          </div>

          <div class="flex items-start justify-between gap-6">
            <h2 class="flex-shrink-0 whitespace-nowrap text-xl sm:text-3xl font-bold text-white leading-tight mt-1">
              探索 {{ categories.length }} 个分类
            </h2>
            <div ref="catScrollRef" class="relative w-[60%] min-w-0 flex gap-2 overflow-x-auto flex-nowrap scrollbar-none pb-2 -mb-2">
            <button
              v-for="cat in categories"
              :key="cat.name"
              ref="catBtnsRef"
              class="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300"
              :class="!selectedCategory && cat.name === '全部' || selectedCategory === cat.name
                ? 'bg-[#e94560] text-white border-[#e94560]'
                : 'text-white/50 border-white/10 hover:text-white hover:border-white/20'"
              @click="selectCategory(cat.name)"
            >
              {{ cat.name }}
            </button>
          </div>
          </div>
        </div>

        <!-- Wallpaper grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4" style="grid-auto-flow: dense;">
          <div
            v-for="(wp, i) in wallpapers"
            :key="wp.id"
            class="group relative rounded-2xl overflow-hidden border border-white/5 cursor-pointer transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/30"
            :class="i % 11 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''"
            style="background: #1a1a24;"
            @click="openModal(wp)"
          >
            <img
              :src="wp.thumb"
              :alt="wp.title"
              class="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              :class="i % 11 === 0 ? 'aspect-[4/3]' : 'aspect-square'"
              loading="lazy"
              decoding="async"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div class="absolute bottom-0 inset-x-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              <p class="text-xs text-white font-medium line-clamp-1">{{ wp.title }}</p>
              <p class="text-[10px] text-white/40 mt-0.5">{{ wp.width }}x{{ wp.height }}</p>
            </div>
          </div>
        </div>

        <!-- Load more -->
        <div v-if="hasMore" class="mt-12 text-center">
          <button
            :disabled="loading"
            class="px-10 py-3.5 rounded-full text-sm font-bold border border-white/10 text-white/70 hover:text-white hover:border-white/20 hover:bg-white/5 disabled:opacity-25 transition-all duration-300"
            @click="fetchWallpapers()"
          >
            <span v-if="loading" class="inline-flex items-center gap-2">
              <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              加载中...
            </span>
            <span v-else>加载更多</span>
          </button>
        </div>

        <!-- Empty -->
        <div v-if="!loading && !wallpapers.length" class="text-center py-20">
          <Icon name="photo" class="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p class="text-white/30 text-lg">没有找到匹配的壁纸</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter
      ctaTitle="找到喜欢的壁纸了？"
      ctaDesc="全部高清无损，免费下载直接装车。"
      @cta="scrollToWallpapers"
      @feedback="showFeedback = true"
    />

    <!-- Wallpaper modal -->
    <WallpaperModal
      v-model="selectedWallpaper"
    />

    <!-- Feedback modal -->
    <FeedbackModal v-model="showFeedback" />

    <!-- AppFab -->
    <AppFab />
  </main>
</template>

<script setup lang="ts">
const toast = useToast()
const showFeedback = ref(false)
const selectedCategory = ref('')
const page = ref(1)
const pageSize = 60
const loading = ref(false)

const wallpapers = ref<any[]>([])
const categories = ref<{ name: string; count: number }[]>([])
const topCategories = ref<string[]>([])
const hasMore = ref(false)
const selectedWallpaper = ref<any>(null)
const catScrollRef = ref<HTMLElement | null>(null)
const catBtnsRef = ref<any>([])

function selectCategory(name: string) {
  const target = name === '全部' ? '' : name
  if (selectedCategory.value === target) return
  selectedCategory.value = target
  nextTick(() => {
    const container = catScrollRef.value
    if (!container) return
    if (!target) { container.scrollTo({ left: 0, behavior: 'smooth' }); return }
    const i = categories.value.findIndex(c => c.name === name)
    const btn = catBtnsRef.value[i]
    if (btn) {
      const scrollLeft = Math.max(0, btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2)
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  })
}

function openModal(wp: any) { selectedWallpaper.value = wp }

async function fetchWallpapers() {
  loading.value = true
  try {
    const params = new URLSearchParams({ page: String(page.value), pageSize: String(pageSize) })
    if (search.value) params.set('search', search.value)
    if (selectedCategory.value) params.set('category', selectedCategory.value)

    const data = await $fetch<any>(`/api/wallpapers?${params}`)
    if (page.value === 1) {
      wallpapers.value = data.items
    } else {
      wallpapers.value.push(...data.items)
    }
    hasMore.value = data.page < data.totalPages
    if (hasMore.value) page.value++
  } catch { /* silent */ } finally { loading.value = false }
}

async function fetchCategories() {
  try {
    const data = await $fetch<any>('/api/wallpapers/categories')
    categories.value = data
    topCategories.value = data.slice(0, 8).map((c: any) => c.name)
  } catch { /* silent */ }
}

function scrollToWallpapers() {
  document.getElementById('wallpapers')?.scrollIntoView({ behavior: 'smooth' })
}

const search = ref('')

watch(selectedCategory, () => { page.value = 1; fetchWallpapers() })
watch(search, () => { page.value = 1; fetchWallpapers() })

onMounted(async () => {
  await fetchCategories()
  await fetchWallpapers()
})

useSeoMeta({
  title: '车机壁纸分享平台',
  description: '高清车机壁纸免费在线预览下载',
  ogTitle: '车机壁纸分享平台',
  ogDescription: '高清车机壁纸免费在线预览下载',
})
</script>
