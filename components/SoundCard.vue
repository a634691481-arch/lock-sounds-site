<template>
  <!-- Double-Bezel outer shell -->
  <div class="doppelrand shadow-tint group cursor-default" style="content-visibility:auto;contain-intrinsic-size:0 86px">
    <!-- Inner core -->
    <div class="doppelrand-inner px-3 py-3 flex items-center gap-3 transition-all duration-600 ease-out-quint group-hover:bg-white/90">

      <!-- Play button — "Button-in-Button" pattern -->
      <div class="relative flex-shrink-0">
        <div class="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500 ease-spring cursor-pointer"
          :class="[
            isPlaying ? 'bg-emerald-400 scale-105' :
            isBuffering ? 'bg-amber-400 animate-pulse' :
            'bg-[#e94560] group-hover:scale-105 group-active:scale-95'
          ]"
          @click="$emit('play', sound)">
          <!-- Inner icon ring -->
          <div class="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-500 ease-out-quint"
            :class="{ 'group-hover:translate-x-px group-hover:-translate-y-px': !isPlaying && !isBuffering }">
            <span v-if="isBuffering" class="text-white text-xs animate-spin">⏳</span>
            <span v-else class="text-white text-sm">{{ isPlaying ? '⏸' : '▶' }}</span>
          </div>
        </div>
        <!-- Glow ring on hover -->
        <div
          v-if="!isPlaying && !isBuffering"
          class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out-quint pointer-events-none"
          style="box-shadow: 0 0 0 3px rgba(233,69,96,0.15);"
        />
      </div>

      <!-- Info -->
      <div class="flex-1 min-w-0">
        <NuxtLink :to="`/sounds/${sound.id}`" class="font-bold text-sm leading-snug truncate text-slate-700 hover:text-[#e94560] transition-colors block no-underline" :title="sound.name">
          {{ sound.name }}
        </NuxtLink>
        <div class="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400/80 whitespace-nowrap overflow-hidden">
          <span class="flex-shrink-0">{{ sound.size }}</span>
          <span class="text-slate-300 flex-shrink-0 select-none">·</span>
          <span class="flex-shrink-0">{{ sound.duration }}</span>
          <span class="text-slate-300 flex-shrink-0 select-none">·</span>
          <span class="flex-shrink-0 tabular-nums">▶ {{ sound.plays.toLocaleString() }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-1 flex-shrink-0">
        <button
          class="w-8 h-8 rounded-xl border-none cursor-pointer bg-white/60 hover:bg-[#e94560] hover:text-white transition-all duration-400 ease-spring text-[13px] flex items-center justify-center active:scale-90"
          title="分享"
          @click="onShare"
        >
          ↗
        </button>
        <button
          class="w-8 h-8 rounded-xl border-none cursor-pointer bg-white/60 hover:bg-[#e94560] hover:text-white transition-all duration-400 ease-spring text-[13px] flex items-center justify-center active:scale-90"
          title="下载"
          @click="$emit('download', sound)"
        >
          ⬇
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Sound } from '~/types/sound'

defineEmits<{ play: [sound: Sound]; download: [sound: Sound] }>()

const props = defineProps<{ sound: Sound; isPlaying: boolean; isBuffering: boolean }>()
const toast = useToast()

function onShare() {
  const url = `${window.location.origin}/sounds/${props.sound.id}`
  navigator.clipboard.writeText(url).then(() => {
    toast.success('链接已复制到剪贴板')
  }).catch(() => {
    toast.error('复制失败')
  })
}
</script>
