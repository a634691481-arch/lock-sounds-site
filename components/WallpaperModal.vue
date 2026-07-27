<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="wallpaper" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95" @click.self="close" @keydown.esc="close" tabindex="-1" ref="modalEl">
        <!-- Close button -->
        <button class="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 border-none text-white/80 hover:text-white cursor-pointer w-10 h-10 rounded-full flex items-center justify-center transition-colors" title="关闭 (Esc)" @click.stop="close">
          <Icon name="x-mark" class="w-5 h-5" />
        </button>

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
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 justify-center">
          <div class="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1.5">
            <button class="flex items-center gap-1 px-3 py-1 bg-[#e94560] hover:bg-[#d63850] border-none text-white rounded-full text-xs font-semibold cursor-pointer transition-colors" @click.stop="handleDownload">
              <Icon name="arrow-down-tray" class="w-3 h-3" />下载
            </button>
            <span class="text-white/20 mx-0.5">|</span>
            <button class="bg-transparent border-none text-white/70 hover:text-white cursor-pointer w-7 h-7 flex items-center justify-center text-base" @click="zoomOut">−</button>
            <span class="text-white/80 text-xs min-w-[42px] text-center tabular-nums">{{ Math.round(scale * 100) }}%</span>
            <button class="bg-transparent border-none text-white/70 hover:text-white cursor-pointer w-7 h-7 flex items-center justify-center text-base" @click="zoomIn">+</button>
            <span class="text-white/20 mx-0.5">|</span>
            <button class="bg-transparent border-none text-white/70 hover:text-white cursor-pointer w-7 h-7 flex items-center justify-center text-xs" @click="resetZoom">1:1</button>
          </div>

          <span class="text-white/50 text-xs hidden sm:inline max-w-[160px] truncate">{{ wallpaper.title }}</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Wallpaper } from '~/types/wallpaper'

const wallpaper = defineModel<Wallpaper | null>()

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
  const a = document.createElement('a')
  a.href = fullSrc.value
  a.download = `${wallpaper.value.title}.png`
  a.click()
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
