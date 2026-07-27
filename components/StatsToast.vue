<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="visible"
        class="fixed top-20 right-5 z-[100] max-w-xs glass border border-white/40 rounded-xl p-3.5 shadow-lg"
      >
        <div class="flex items-start gap-2">
          <span class="text-base flex-shrink-0">📊</span>
          <div class="text-xs text-slate-600 leading-relaxed">
            <div>总访问 <span class="font-semibold text-slate-800"><span id="busuanzi_value_site_pv"></span></span></div>
            <div>访客数 <span class="font-semibold text-slate-800"><span id="busuanzi_value_site_uv"></span></span> · 今日 <span class="font-semibold text-slate-800"><span id="busuanzi_value_today_pv"></span></span></div>
          </div>
          <button class="ml-auto flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors" @click="dismiss">&times;</button>
        </div>
        <div class="mt-2 h-1 rounded-full bg-slate-200 overflow-hidden">
          <div class="h-full rounded-full bg-[#e94560] transition-all" :style="{ width: progress + '%' }" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const visible = ref(false)
const progress = ref(100)
let timer: ReturnType<typeof setInterval> | null = null

function dismiss() {
  visible.value = false
  if (timer) clearInterval(timer)
}

function waitForBusuanzi(): Promise<void> {
  return new Promise((resolve) => {
    const check = () => {
      const el = document.getElementById('busuanzi_value_site_pv')
      if (el && el.textContent && !el.textContent.startsWith(' ')) resolve()
      else setTimeout(check, 200)
    }
    check()
  })
}

onMounted(async () => {
  await waitForBusuanzi()
  visible.value = true
  progress.value = 100
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