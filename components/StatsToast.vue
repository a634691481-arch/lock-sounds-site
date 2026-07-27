<template>
  <span
    :title="`总访问 ${pv} · 访客数 ${uv} · 今日访问 ${today}`"
    class="inline-flex items-center gap-1 text-[10px] text-slate-400/60 hover:text-slate-500 transition-colors cursor-help"
  >
    <Icon name="chart-bar" class="w-3 h-3" />
    <span>{{ today || '—' }}</span>
  </span>
</template>

<script setup lang="ts">
const pv = ref('')
const uv = ref('')
const today = ref('')

if (import.meta.client) {
  const fnName = '__busuanzi_cb_' + Date.now()
  ;(window as any)[fnName] = (data: any) => {
    if (data) {
      pv.value = String(data.site_pv || '')
      uv.value = String(data.site_uv || '')
      today.value = String(data.today_pv || '')
    }
    delete (window as any)[fnName]
  }
  const script = document.createElement('script')
  script.src = `https://busuanzi.ibruce.info/busuanzi?jsonp=${fnName}`
  script.onload = () => script.remove()
  script.onerror = () => script.remove()
  onMounted(() => document.head.appendChild(script))
}
</script>