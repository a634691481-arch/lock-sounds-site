<template>
  <div>
    <!-- Loading skeleton -->
    <div v-if="loading" class="space-y-4 py-4">
      <div class="flex gap-2 py-3">
        <div v-for="n in 6" :key="n" class="h-9 w-24 rounded-full bg-white/60 backdrop-blur-sm animate-pulse" />
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <div v-for="n in 8" :key="n" class="doppelrand animate-pulse">
          <div class="aspect-[16/9] bg-white/60 rounded-xl" />
          <div class="p-2 space-y-1.5">
            <div class="h-3 bg-white/60 rounded w-3/4" />
            <div class="h-2 bg-white/40 rounded w-1/2" />
          </div>
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-32">
      <div class="flex justify-center mb-4"><Icon name="exclamation-triangle" class="w-12 h-12 text-slate-300" /></div>
      <p class="text-slate-500 mb-6">{{ error }}</p>
      <button
        class="px-8 py-3 glass font-playful text-lg text-[#e94560] border-white/40 cursor-pointer hover:bg-white/90 transition-all duration-200 active:scale-95"
        @click="fetchWallpapers"
      >重新加载</button>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Intro paragraph -->
      <div class="py-4 text-center">
        <p class="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
          车机壁纸分享平台，收录 <strong class="text-[#e94560]">{{ totalCount }}</strong> 张高清车机壁纸。支持在线预览、免费下载，涵盖动漫、人物、自然景色等多种分类，让你的车机屏幕与众不同。
        </p>
      </div>

      <!-- Filter bar -->
      <div class="z-40 -mx-5 px-5 pt-2 pb-2 space-y-3 bg-gradient-to-b backdrop-blur-md">
        <!-- Row 1: Sort -->
        <div class="flex items-center gap-2">
          <span class="text-[10px] text-slate-400 uppercase tracking-wider font-bold flex-shrink-0">排序</span>
          <button
            v-for="opt in sortOptions"
            :key="opt.value"
            :class="[
              'px-3 py-1.5 rounded-full text-xs font-semibold border-none cursor-pointer transition-all duration-200',
              sort === opt.value
                ? 'bg-[#e94560] text-white shadow-[0_1px_6px_rgba(233,69,96,0.3)]'
                : 'bg-white/70 text-slate-500 hover:bg-white hover:text-slate-700',
            ]"
            @click="sort = opt.value"
          >
            {{ opt.label }}
          </button>
          <span class="text-[10px] text-slate-300 ml-auto flex-shrink-0">共 {{ totalCount }}</span>
        </div>

        <!-- Row 2: Categories -->
        <div class="flex items-center gap-1.5">
          <span class="text-[10px] text-slate-400 uppercase tracking-wider font-bold flex-shrink-0">分类</span>
          <div class="flex gap-1 overflow-x-auto flex-1 scrollbar-hide">
            <button
              v-for="cat in categories"
              :key="cat.name"
              :class="[
                'px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border-none cursor-pointer flex-shrink-0',
                activeCategory === cat.name
                  ? 'bg-[#e94560] text-white shadow-[0_1px_6px_rgba(233,69,96,0.3)]'
                  : 'bg-white/70 text-slate-500 hover:bg-white/90',
              ]"
              :data-wp-cat="cat.name"
              @click="selectCategory(cat.name)"
            >
              {{ cat.name }}<span class="opacity-60 ml-0.5">{{ cat.count }}</span>
            </button>
          </div>
        </div>
      </div>

      <h2 class="text-lg font-bold text-slate-700 mt-4 mb-2">全部壁纸</h2>
      <template v-if="wallpapers.length === 0">
        <div class="text-center py-32">
          <div class="flex justify-center mb-4"><Icon name="magnifying-glass" class="w-12 h-12 text-slate-300" /></div>
          <p class="text-slate-400 font-playful text-lg">没有匹配的壁纸</p>
          <p class="text-slate-300 text-sm mt-1">换换搜索词试试？</p>
        </div>
      </template>
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 pb-16 pt-2 gap-3">
        <div
          v-for="w in wallpapers"
          :key="w.id"
          class="doppelrand shadow-tint group cursor-pointer overflow-hidden"
          @click="preview = w"
        >
          <div class="aspect-[16/9] bg-slate-100 overflow-hidden rounded-xl">
            <img
              :src="w.thumb"
              :alt="w.title"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover transition-transform duration-500 ease-out-quint group-hover:scale-105"
            />
          </div>
          <div class="px-2 py-2 flex items-center justify-between">
            <span class="text-xs text-slate-600 truncate flex-1 min-w-0 font-semibold">{{ w.title }}</span>
            <span class="text-[10px] text-slate-400 flex-shrink-0 ml-1">{{ w.width || '' }}{{ w.width && w.height ? '×' : '' }}{{ w.height || '' }}</span>
          </div>
        </div>
      </div>
    </template>

    <!-- load-more sentinel -->
    <div v-if="hasMore" ref="sentinel" class="text-center py-8">
      <span v-if="loadingMore" class="text-sm text-slate-400">加载中...</span>
      <span v-else class="text-sm text-slate-300">{{ wallpapers.length }} / {{ totalCount }}</span>
    </div>

    <!-- Modal -->
    <WallpaperModal v-model="preview" />
  </div>
</template>

<script setup lang="ts">
import type { Wallpaper } from '~/types/wallpaper'

const props = defineProps<{ search: string }>()

const activeCategory = ref('全部')
const sort = ref('latest')
const page = ref(1)
const pageSize = 60
const totalCount = ref(0)
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

const sentinel = useInfiniteScroll(() => {
  if (!loadingMore.value && hasMore.value) loadMore()
})

async function fetchWallpapers(reset = true, showLoading = true) {
  if (reset) {
    page.value = 1
    if (showLoading) loading.value = true
    error.value = ''
  }
  try {
    const res = await $fetch<{ data: string }>('/api/wallpapers', {
      query: {
        category: activeCategory.value,
        sort: sort.value,
        search: props.search,
        page: page.value,
        pageSize
      }
    })
    const data = decryptResponse<{ items: Wallpaper[]; total: number; totalPages: number }>(res.data)
    if (reset) wallpapers.value = data.items
    else wallpapers.value.push(...data.items)
    totalCount.value = data.total
    totalPages.value = data.totalPages
  } catch (e: any) {
    error.value = e?.message || '加载失败'
  }
  if (showLoading) loading.value = false
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
  error.value = ''
  fetchWallpapers(true, false)
    .then(fetchCategories)
    .then(() => {
      nextTick(() => {
        const el = document.querySelector<HTMLElement>(`[data-wp-cat="${cat}"]`)
        el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      })
    })
}

async function fetchCategories() {
  try {
    const res = await $fetch<{ data: string }>('/api/wallpapers/categories')
    categories.value = decryptResponse<{ name: string; count: number }[]>(res.data)
  } catch {}
}

onMounted(async () => {
  await Promise.all([fetchWallpapers(), fetchCategories()])
})

watch(() => props.search, () => fetchWallpapers(true, false))
watch(sort, () => fetchWallpapers(true, false))
</script>
