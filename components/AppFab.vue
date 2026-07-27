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
      class="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-amber-400 ring-4 ring-white/60 shadow-[0_4px_16px_rgba(251,191,36,0.5)] cursor-pointer text-white text-sm sm:text-lg hover:scale-110 hover:shadow-[0_8px_28px_rgba(251,191,36,0.6)] transition-all duration-300 ease-spring flex items-center justify-center border-none"
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
    <Transition name="donate">
      <div v-if="showDonate" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="showDonate = false">
        <div class="bg-white rounded-2xl p-6 max-w-[280px] text-center shadow-2xl" @click.stop>
          <div class="text-3xl mb-2">🧧</div>
          <p class="text-slate-700 font-semibold text-base mb-1">你的打赏是我开发的动力</p>
          <p class="text-slate-400 text-xs mb-4">扫一扫赞赏支持</p>
          <div class="bg-slate-50 rounded-xl p-3 mb-3">
            <img src="/donate-qr.png" alt="收款二维码" class="w-full aspect-square object-contain" onerror="this.style.display='none'" />
          </div>
          <button class="px-5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 text-sm rounded-full border-none cursor-pointer transition-colors" @click="showDonate = false">关闭</button>
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

<style scoped>
.donate-enter-active { transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1); }
.donate-leave-active { transition: all 0.15s ease-in; }
.donate-enter-from, .donate-leave-to { opacity: 0; }
.donate-enter-from > div, .donate-leave-to > div { transform: scale(0.9); }
</style>
