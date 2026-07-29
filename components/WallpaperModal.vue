<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="wallpaper" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95" @click.self="close" @keydown.esc="close" @keydown.left="goPrev" @keydown.right="goNext" tabindex="-1" ref="modalEl">
        <!-- Close button -->
        <button class="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 border-none text-white/80 hover:text-white cursor-pointer w-10 h-10 rounded-full flex items-center justify-center transition-colors" title="关闭 (Esc)" @click.stop="close">
          <Icon name="x-mark" class="w-5 h-5" />
        </button>

        <!-- Side nav arrows (desktop) -->
        <button v-if="hasPrev" class="absolute left-3 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 border-none text-white/60 hover:text-white cursor-pointer transition-all text-xl" title="上一张" @click.stop="goPrev">&lsaquo;</button>
        <button v-if="hasNext" class="absolute right-3 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 border-none text-white/60 hover:text-white cursor-pointer transition-all text-xl" title="下一张" @click.stop="goNext">&rsaquo;</button>

        <!-- Zoomable image area -->
        <div
          ref="imageContainer"
          class="w-full h-full flex items-center justify-center overflow-hidden cursor-grab"
          :class="{ 'cursor-grabbing': isDragging }"
          @wheel.prevent="onWheel"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseUp"
        >
          <img
            :src="fullSrc"
            :alt="wallpaper.title"
            :style="imageStyle"
            draggable="false"
            loading="lazy"
            decoding="async"
            class="select-none max-w-full max-h-full"
          />
        </div>

        <!-- Bottom bar -->
        <div class="absolute bottom-4 sm:bottom-6 left-0 right-0 flex flex-col items-center gap-1.5 sm:gap-2 px-4 sm:px-0">
          <!-- Title -->
          <p class="text-white/50 text-xs sm:text-sm max-w-[70vw] sm:max-w-[400px] truncate text-center">{{ wallpaper.title }}</p>

          <!-- Controls bar -->
          <div class="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1.5 sm:py-2 flex-nowrap whitespace-nowrap">
            <button class="bg-white/5 hover:bg-white/15 border-none text-white/70 hover:text-white cursor-pointer w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base disabled:opacity-25 disabled:cursor-default transition-colors" :disabled="!hasPrev" @click.stop="goPrev">
              <Icon name="arrow-left" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <span class="text-white/15 mx-0.5 select-none">|</span>

            <button class="flex items-center gap-1 px-3 py-1 bg-[#e94560] hover:bg-[#d63850] border-none text-white rounded-full text-xs sm:text-sm font-semibold cursor-pointer transition-colors" @click.stop="handleDownload">
              <Icon name="arrow-down-tray" class="w-3.5 h-3.5" />下载
            </button>

            <span class="text-white/15 mx-0.5 select-none">|</span>

            <button class="bg-transparent border-none text-white/70 hover:text-white cursor-pointer w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm" @click="zoomOut">−</button>
            <span class="text-white/80 text-[10px] sm:text-xs min-w-[32px] sm:min-w-[40px] text-center tabular-nums">{{ Math.round(scale * 100) }}%</span>
            <button class="bg-transparent border-none text-white/70 hover:text-white cursor-pointer w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm" @click="zoomIn">+</button>

            <span class="text-white/15 mx-0.5 select-none">|</span>

            <button class="bg-transparent border-none text-white/70 hover:text-white cursor-pointer w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[10px] sm:text-xs" @click="resetZoom">1:1</button>

            <span class="text-white/15 mx-0.5 select-none">|</span>

            <button class="bg-white/5 hover:bg-white/15 border-none text-white/70 hover:text-white cursor-pointer w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base disabled:opacity-25 disabled:cursor-default transition-colors" :disabled="!hasNext" @click.stop="goNext">
              <Icon name="arrow-right" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          <!-- Counter -->
          <p class="text-white/25 text-[10px] sm:text-xs">{{ currentIndex + 1 }} / {{ list.length }}</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Wallpaper } from '~/types/wallpaper'

const wallpaper = defineModel<Wallpaper | null>()
const props = defineProps<{ list?: Wallpaper[] }>()
const tracker = useTracker()

const list = computed(() => props.list ?? [])
const currentIndex = computed(() => {
  if (!wallpaper.value) return -1
  return list.value.findIndex(w => w.id === wallpaper.value!.id)
})
const hasPrev = computed(() => currentIndex.value > 0)
const hasNext = computed(() => currentIndex.value < list.value.length - 1)

function goPrev() {
  if (!hasPrev.value || !wallpaper.value) return
  wallpaper.value = list.value[currentIndex.value - 1]
}
function goNext() {
  if (!hasNext.value || !wallpaper.value) return
  wallpaper.value = list.value[currentIndex.value + 1]
}

const toast = useToast()

const modalEl = ref<HTMLElement | null>(null)
const imageContainer = ref<HTMLElement | null>(null)
const scale = ref(1)
const posX = ref(0)
const posY = ref(0)
const isDragging = ref(false)
let dragStartX = 0, dragStartY = 0, dragStartPosX = 0, dragStartPosY = 0

const MIN_SCALE = 0.3
const MAX_SCALE = 5

const fullSrc = computed(() => wallpaper.value?.medium || wallpaper.value?.thumb || '')

const imageStyle = computed(() => ({
  transform: `translate(${posX.value}px, ${posY.value}px) scale(${scale.value})`,
}))

function clampScale(v: number) { return Math.min(MAX_SCALE, Math.max(MIN_SCALE, v)) }
function zoomIn() { scale.value = clampScale(scale.value + 0.25) }
function zoomOut() {
  const ns = clampScale(scale.value - 0.25)
  if (ns <= 1) { scale.value = 1; posX.value = 0; posY.value = 0 }
  else scale.value = ns
}
function resetZoom() { scale.value = 1; posX.value = 0; posY.value = 0 }

function onWheel(e: WheelEvent) {
  const delta = e.deltaY > 0 ? -0.15 : 0.15
  const ns = clampScale(scale.value + delta)
  if (imageContainer.value) {
    const r = imageContainer.value.getBoundingClientRect()
    const cx = e.clientX - r.left - r.width / 2
    const cy = e.clientY - r.top - r.height / 2
    const ratio = ns / scale.value
    posX.value = (posX.value - cx) * ratio + cx
    posY.value = (posY.value - cy) * ratio + cy
  }
  if (ns <= 1) { scale.value = 1; posX.value = 0; posY.value = 0 }
  else scale.value = ns
}

function onMouseDown(e: MouseEvent) {
  if (scale.value <= 1) return
  isDragging.value = true
  dragStartX = e.clientX; dragStartY = e.clientY
  dragStartPosX = posX.value; dragStartPosY = posY.value
}
function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return
  posX.value = dragStartPosX + (e.clientX - dragStartX)
  posY.value = dragStartPosY + (e.clientY - dragStartY)
}
function onMouseUp() { isDragging.value = false }

function close() {
  resetZoom()
  wallpaper.value = null
}

function handleDownload() {
  if (!wallpaper.value) return
  tracker.trackWallpaperDownload(wallpaper.value)
  downloadFile(fullSrc.value, `${wallpaper.value.title}.png`)
  toast.success(`正在下载 ${wallpaper.value.title}`)
}

watch(wallpaper, (val) => {
  if (val) {
    nextTick(() => modalEl.value?.focus())
  }
})
</script>

<style scoped>
.modal-enter-active { transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
.modal-leave-active { transition: all 0.15s ease-in; }
.modal-enter-from { opacity: 0; }
.modal-enter-from img { opacity: 0; transform: scale(0.9); }
.modal-leave-to { opacity: 0; }
</style>
