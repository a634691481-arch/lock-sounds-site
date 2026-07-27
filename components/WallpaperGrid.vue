<template>
  <div>
    <!-- Category tabs -->
    <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        v-for="cat in categories"
        :key="cat.name"
        class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border-none cursor-pointer transition-all duration-200 whitespace-nowrap"
        :class="activeCategory === cat.name
          ? 'bg-[#e94560] text-white shadow-[0_2px_8px_rgba(233,69,96,0.3)]'
          : 'bg-white/60 text-slate-500 hover:bg-white/80 hover:text-slate-700'"
        @click="selectCategory(cat.name)"
      >
        {{ cat.name }} ({{ cat.count }})
      </button>
    </div>

    <!-- Sort -->
    <div class="flex items-center gap-2 mt-3 mb-4">
      <span class="text-xs text-slate-400 flex-shrink-0">排序:</span>
      <button
        v-for="o in sortOptions"
        :key="o.value"
        class="text-xs px-3 py-1 rounded-full border-none cursor-pointer transition-all duration-200"
        :class="sort === o.value ? 'bg-[#e94560] text-white' : 'bg-white/50 text-slate-500 hover:bg-white/80'"
        @click="sort = o.value"
      >{{ o.label }}</button>
    </div>

    <!-- Grid -->
    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      <div v-for="i in 12" :key="i" class="doppelrand animate-pulse">
        <div class="aspect-[16/9] bg-slate-100 rounded-xl" />
      </div>
    </div>

    <div v-else-if="error" class="text-center py-16">
      <div class="flex justify-center mb-4"><Icon name="exclamation-triangle" class="w-10 h-10 text-slate-300" /></div>
      <p class="text-slate-500 mb-4">{{ error }}</p>
      <button class="px-6 py-2 glass text-[#e94560] rounded-full border-none cursor-pointer" @click="fetchWallpapers">重试</button>
    </div>

    <div v-else-if="wallpapers.length === 0" class="text-center py-16">
      <div class="flex justify-center mb-4"><Icon name="magnifying-glass" class="w-10 h-10 text-slate-300" /></div>
      <p class="text-slate-400">该分类暂无壁纸</p>
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      <div
        v-for="w in wallpapers"
        :key="w.id"
        class="doppelrand shadow-tint group cursor-pointer overflow-hidden"
        @click="preview = w"
      >
        <div class="aspect-[16/9] bg-slate-100 overflow-hidden">
          <img
            :src="w.thumb"
            :alt="w.title"
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-500 ease-out-quint group-hover:scale-105"
          />
        </div>
        <div class="px-2 py-1.5 flex items-center justify-between">
          <span class="text-xs text-slate-600 truncate flex-1 min-w-0">{{ w.title }}</span>
          <span class="text-[10px] text-slate-400 flex-shrink-0 ml-1">{{ w.width }}×{{ w.height }}</span>
        </div>
      </div>
    </div>

    <!-- Load more -->
    <div v-if="hasMore" class="text-center py-8">
      <button
        class="px-8 py-3 glass font-playful text-lg text-[#e94560] border-white/40 cursor-pointer hover:bg-white/90 transition-all duration-200 active:scale-95"
        :disabled="loadingMore"
        @click="loadMore"
      >
        {{ loadingMore ? '加载中...' : `加载更多 (${page}/${totalPages})` }}
      </button>
    </div>

    <!-- Modal -->
    <WallpaperModal v-model="preview" />
  </div>
</template>

<script setup lang="ts">
import type { Wallpaper } from '~/types/wallpaper'

const activeCategory = ref('全部')
const sort = ref('latest')
const page = ref(1)
const pageSize = 40
const totalPages = ref(0)
const wallpapers = ref<Wallpaper[]>([])
const loading = ref(true)
const loadingMore = ref(false)
const error = ref('')
const preview = ref<Wallpaper | null>(null)

const sortOptions = [
  { label: '最新', value: 'latest' },
  { label: '下载', value: 'downloads' },
  { label: '浏览', value: 'views' },
]

const categories = ref<{ name: string; count: number }[]>([])

const hasMore = computed(() => page.value < totalPages.value)

async function fetchWallpapers(reset = true) {
  if (reset) {
    page.value = 1
    loading.value = true
    error.value = ''
  }
  try {
    const res = await $fetch<{ items: Wallpaper[]; total: number; totalPages: number }>('/api/wallpapers', {
      query: { category: activeCategory.value, sort: sort.value, page: page.value, pageSize }
    })
    if (reset) {
      wallpapers.value = res.items
    } else {
      wallpapers.value.push(...res.items)
    }
    totalPages.value = res.totalPages
  } catch (e: any) {
    error.value = e?.message || '加载失败'
  }
  loading.value = false
  loadingMore.value = false
}

async function loadMore() {
  if (loadingMore.value || !hasMore.value) return
  loadingMore.value = true
  page.value++
  await fetchWallpapers(false)
}

function selectCategory(cat: string) {
  activeCategory.value = cat
  fetchWallpapers()
}

async function fetchCategories() {
  try {
    categories.value = await $fetch<{ name: string; count: number }[]>('/api/wallpapers/categories')
  } catch {}
}

onMounted(async () => {
  await Promise.all([fetchWallpapers(), fetchCategories()])
})

watch(sort, () => fetchWallpapers())
</script>
