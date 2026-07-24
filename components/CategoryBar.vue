<template>
  <!-- Category bar — sticky below header -->
  <div class="sticky top-[88px] z-40 -mx-5 px-5 pb-2 pt-1 bg-gradient-to-b from-white/70 via-white/40 to-transparent backdrop-blur-sm">
    <!-- Row 1: Sort + search hint -->
    <div class="flex items-center gap-3 mb-1">
      <span class="text-[10px] text-slate-400 tracking-wider uppercase font-bold">排序</span>
      <div class="flex gap-1">
        <button
          v-for="opt in sortOptions"
          :key="opt.value"
          :class="[
            'px-2.5 py-1 rounded-full text-[11px] font-semibold border-none cursor-pointer transition-all duration-200',
            sort === opt.value
              ? 'bg-[#e94560] text-white shadow-[0_1px_6px_rgba(233,69,96,0.3)]'
              : 'bg-white/60 text-slate-500 hover:bg-white'
          ]"
          @click="sort = opt.value; page = 1; fetchSounds()"
        >
          {{ opt.label }}
        </button>
      </div>
      <span class="text-[10px] text-slate-400 ml-auto flex-shrink-0">{{ totalCount }} 个</span>
    </div>

    <!-- Row 2: Categories + Recently played -->
    <div class="flex items-center gap-2">
      <!-- Recently played inline -->
      <button
        v-if="recentSounds.length && activeCategory === '全部' && !search"
        class="flex-shrink-0 px-2.5 py-1.5 rounded-full text-[11px] font-semibold border-none cursor-pointer transition-all duration-200 bg-amber-50 text-amber-600 hover:bg-amber-100 flex items-center gap-1"
        title="最近播放"
        @click="handleRecent"
      >
        🕐
        <span class="hidden sm:inline">{{ recentSounds[0].name }}</span>
      </button>

      <!-- Category tabs scrollable -->
      <div class="flex gap-1.5 overflow-x-auto flex-1 scrollbar-hide">
        <button
          v-for="cat in tabs"
          :key="cat.name"
          :class="[
            'px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-200 border-none cursor-pointer flex-shrink-0',
            activeCategory === cat.name
              ? 'bg-[#e94560] text-white shadow-[0_2px_8px_rgba(233,69,96,0.25)]'
              : 'bg-white/60 text-slate-500 hover:bg-white/90'
          ]"
          @click="handleCategorySelect(cat.name)"
        >
          {{ cat.name }}
          <span class="opacity-60 ml-0.5">{{ cat.count }}</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Recently played expanded list -->
  <div v-if="showRecent && recentSounds.length" class="py-3">
    <div class="flex items-center gap-2 mb-2">
      <span class="text-xs text-slate-400 font-bold tracking-wide uppercase">🕐 最近播放</span>
      <button class="text-[10px] text-[#e94560] border-none bg-transparent cursor-pointer" @click="showRecent = false">收起</button>
    </div>
    <div class="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-3">
      <SoundCard
        v-for="sound in recentSounds"
        :key="'rec-'+sound.id"
        :sound="sound"
        :is-playing="player.playingId.value === sound.id"
        :is-buffering="player.bufferingId.value === sound.id"
        @play="playSound"
        @download="handleDownload"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Sound, Category, SortType } from '~/types/sound'

const props = defineProps<{
  categories: Category[]
  activeCategory: string
  sort: SortType
  totalCount: number
  sounds: Sound[]
  recentSounds: Sound[]
  searchActive: boolean
}>()

const emit = defineEmits<{
  'update:sort': [val: SortType]
  'update:activeCategory': [val: string]
  'update:page': [val: number]
  fetchSounds: []
  fetchData: []
  playSound: [sound: Sound]
  handleDownload: [sound: Sound]
  handleCategorySelect: [cat: string]
}>()

const showRecent = ref(false)

const totalCountAll = computed(() =>
  props.categories.reduce((sum, c) => sum + c.count, 0)
)

const tabs = computed(() => [
  { name: '全部', count: totalCountAll.value },
  ...props.categories
])

const sortOptions: { label: string; value: SortType }[] = [
  { label: '最新', value: 'latest' },
  { label: '最热', value: 'plays' },
  { label: '下载', value: 'downloads' },
]

function setSort(val: SortType) {
  emit('update:sort', val)
  emit('update:page', 1)
  emit('fetchSounds')
}

function selectCat(cat: string) {
  emit('update:activeCategory', cat)
  emit('update:page', 1)
  emit('fetchData')
}

function handleRecent() {
  showRecent.value = !showRecent.value
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
