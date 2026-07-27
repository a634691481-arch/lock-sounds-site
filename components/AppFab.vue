<template>
  <div class="fixed top-0 left-0 z-[300] h-1 pointer-events-none" :style="{ width: scrollProgress + '%', background: 'linear-gradient(90deg, #e94560, #f59e0b, #eab308, #22c55e, #06b6d4, #8b5cf6, #e94560)', backgroundSize: '200% 100%', animation: 'rainbow 2s linear infinite' }" />

  <div
    class="fixed z-[999] left-5 flex flex-col gap-3"
    :class="playerActive ? 'bottom-[230px] sm:bottom-20' : 'bottom-20 sm:bottom-5'"
  >
    <button
      class="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#e94560] ring-4 ring-white/60 shadow-[0_4px_16px_rgba(233,69,96,0.5)] cursor-pointer text-white text-sm sm:text-lg hover:scale-110 hover:shadow-[0_8px_28px_rgba(233,69,96,0.6)] transition-all duration-300 ease-spring flex items-center justify-center border-none"
      title="回到顶部"
      @click="scrollToTop"
    >
      <Icon name="arrow-up" class="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
    <button
      class="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#e94560] ring-4 ring-white/60 shadow-[0_4px_16px_rgba(233,69,96,0.5)] cursor-pointer text-white text-sm sm:text-lg hover:scale-110 hover:shadow-[0_8px_28px_rgba(233,69,96,0.6)] transition-all duration-300 ease-spring flex items-center justify-center border-none"
      title="打赏支持"
      @click="showDonate = true"
    >
      <Icon name="heart" class="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
    <button
      class="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#e94560] ring-4 ring-white/60 shadow-[0_4px_16px_rgba(233,69,96,0.5)] cursor-pointer text-white text-sm sm:text-lg hover:scale-110 hover:shadow-[0_8px_28px_rgba(233,69,96,0.6)] transition-all duration-300 ease-spring flex items-center justify-center border-none"
      title="反馈与建议"
      @click="$emit('feedback')"
    >
      <Icon name="chat-bubble-left-ellipsis" class="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  </div>

  <!-- Donate modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="showDonate" class="fixed inset-0 z-[9999] flex items-center justify-center p-4" @click.self="showDonate = false" @keydown.esc="showDonate = false" tabindex="-1" ref="donateModalEl">
        <div class="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        <div class="relative doppelrand shadow-tint w-full max-w-sm">
          <div class="doppelrand-inner p-5 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Icon name="heart" class="w-5 h-5 text-[#e94560]" />
                <span class="font-bold text-slate-700">打赏支持</span>
              </div>
              <button class="bg-transparent border-none text-slate-400 hover:text-[#e94560] cursor-pointer text-lg transition-colors" @click="showDonate = false"><Icon name="x-mark" class="w-4 h-4" /></button>
            </div>
            <div class="text-center">
              <p class="text-slate-600 text-sm mb-4">你的打赏是我开发的动力</p>
              <div class="bg-white rounded-xl p-2 mb-2 border border-slate-100">
                <img :src="donateQrSrc" alt="收款二维码" class="w-full aspect-square object-contain" />
              </div>
              <p class="text-slate-400 text-xs">扫一扫赞赏支持</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ playerActive?: boolean }>()
defineEmits<{ feedback: [] }>()

const scrollProgress = ref(0)
const showDonate = ref(false)
const donateQrSrc = '/donate-qr.png'
const donateModalEl = ref<HTMLElement | null>(null)

watch(showDonate, (val) => {
  if (val) nextTick(() => donateModalEl.value?.focus())
})

function updateScrollProgress() {
  const h = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = h > 0 ? (window.scrollY / h) * 100 : 0
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})
</script>
