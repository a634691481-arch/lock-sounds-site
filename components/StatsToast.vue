<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="visible"
        class="fixed top-20 right-5 z-[10000] bg-emerald-500/90 text-white px-5 py-3 rounded-2xl shadow-lg backdrop-blur-md flex flex-col gap-1.5 max-w-xs"
      >
        <div class="flex items-start gap-2">
          <span class="flex-shrink-0"><Icon name="information-circle" class="w-4 h-4" /></span>
          <div class="text-sm leading-relaxed">
            <div>总访问 <span class="font-semibold">{{ pv }}</span></div>
            <div>访客数 <span class="font-semibold">{{ uv }}</span> · 今日 <span class="font-semibold">{{ today }}</span></div>
          </div>
          <button class="ml-auto flex-shrink-0 bg-transparent border-none cursor-pointer text-white/70 hover:text-white text-sm" @click="dismiss"><Icon name="x-mark" class="w-3.5 h-3.5" /></button>
        </div>
        <div class="h-1 rounded-full bg-white/20 overflow-hidden">
          <div class="h-full rounded-full bg-white transition-all" :style="{ width: progress + '%' }" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const visible = ref(false)
const progress = ref(100)
const pv = ref('')
const uv = ref('')
const today = ref('')
let timer: ReturnType<typeof setInterval> | null = null

function dismiss() {
  visible.value = false
  if (timer) clearInterval(timer)
}

function pollBusuanzi() {
  const pvEl = document.getElementById('busuanzi_value_site_pv')
  const uvEl = document.getElementById('busuanzi_value_site_uv')
  const todayEl = document.getElementById('busuanzi_value_today_pv')
  if (pvEl?.textContent && uvEl?.textContent && todayEl?.textContent) {
    pv.value = pvEl.textContent.trim()
    uv.value = uvEl.textContent.trim()
    today.value = todayEl.textContent.trim()
  } else {
    setTimeout(pollBusuanzi, 300)
  }
}

onMounted(() => {
  visible.value = true
  progress.value = 100
  pollBusuanzi()
  const start = Date.now()
  const duration = 5000
  timer = setInterval(() => {
    const elapsed = Date.now() - start
    progress.value = Math.max(0, 100 - (elapsed / duration) * 100)
    if (elapsed >= duration) dismiss()
  }, 30)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.toast-enter-active { transition: all 0.3s ease-out; }
.toast-leave-active { transition: all 0.3s ease-in; }
.toast-enter-from { opacity: 0; transform: translateX(40px); }
.toast-leave-to { opacity: 0; transform: translateX(40px); }
</style>