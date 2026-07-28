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
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p class="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-white/30 font-semibold mb-3">
              Wallpaper Collection
            </p>
            <h2 class="text-2xl sm:text-3xl font-bold text-white leading-tight">
              探索 {{ categories.length }} 个分类
            </h2>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <button
              class="px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300"
              :class="!selectedCategory
                ? 'bg-[#e94560] text-white border-[#e94560]'
                : 'text-white/50 border-white/10 hover:text-white hover:border-white/20'"
              @click="selectedCategory = ''"
            >
              全部
            </button>
            <button
              v-for="cat in categories.slice(0, 6)"
              :key="cat.name"
              class="px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300"
              :class="selectedCategory === cat.name
                ? 'bg-[#e94560] text-white border-[#e94560]'
                : 'text-white/50 border-white/10 hover:text-white hover:border-white/20'"
              @click="selectedCategory = selectedCategory === cat.name ? '' : cat.name"
            >
              {{ cat.name }} ({{ cat.count }})
            </button>
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
            <div class="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <div class="absolute bottom-0 inset-x-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              <p class="text-xs text-white font-medium line-clamp-1">{{ wp.title }}</p>
              <p class="text-[10px] text-white/40 mt-0.5">{{ wp.width }}x{{ wp.height }}</p>
            </div>
          </div>
        </div>

        <!-- Load more -->
        <div v-if="hasMore" class="mt-12 text-center">
          <button
            class="px-10 py-3.5 rounded-full text-sm font-bold border border-white/10 text-white/70 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300"
            @click="page++; fetchWallpapers()"
          >
            加载更多
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
      v-if="selectedWallpaper"
      :wallpaper="selectedWallpaper"
      @close="selectedWallpaper = null"
    />

    <!-- Feedback modal -->
    <FeedbackModal v-model="showFeedback" />

    <!-- AppFab -->
    <AppFab @feedback="showFeedback = true" />
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
    hasMore.value = data.items.length === pageSize
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
