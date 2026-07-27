<template>
  <span
    :title="`总访问 ${pv} · 访客数 ${uv} · 今日访问 ${today}`"
    class="inline-flex items-center gap-1 text-[10px] text-slate-400/60 hover:text-slate-500 transition-colors cursor-help"
  >
    <Icon name="chart-bar" class="w-3 h-3" />
    <span>{{ today }}</span>
  </span>
</template>

<script setup lang="ts">
const pv = ref('')
const uv = ref('')
const today = ref('')

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
  pollBusuanzi()
})
</script>
