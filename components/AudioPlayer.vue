<template>
  <Transition name="pop">
    <div
      v-if="sound"
      class="fixed z-[200] doppelrand shadow-tint
        bottom-0 left-0 right-0 rounded-b-none
        sm:bottom-5 sm:left-auto sm:right-5 sm:w-80 sm:rounded-b-[1.25rem]"
    >
      <div class="doppelrand-inner px-3 py-3 flex flex-col gap-2">
        <!-- Eyebrow -->
        <div class="hidden sm:flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <div class="flex gap-0.5 items-end h-3">
              <span class="w-0.5 bg-[#e94560] rounded-full animate-pulse" style="height:50%;animation-delay:0s" />
              <span class="w-0.5 bg-[#e94560] rounded-full animate-pulse" style="height:100%;animation-delay:0.08s" />
              <span class="w-0.5 bg-[#e94560] rounded-full animate-pulse" style="height:35%;animation-delay:0.16s" />
              <span class="w-0.5 bg-[#e94560] rounded-full animate-pulse" style="height:70%;animation-delay:0.12s" />
            </div>
            <span class="eyebrow text-slate-400 bg-white/50">正在播放</span>
          </div>
          <button class="bg-transparent border-none text-slate-400 hover:text-[#e94560] cursor-pointer text-xs transition-colors duration-300" @click="$emit('close')">✕</button>
        </div>

        <!-- Track name -->
        <div class="flex items-center gap-2">
          <div class="font-bold text-xs sm:text-sm text-slate-700 truncate leading-snug flex-1 min-w-0" :title="sound.name">
            {{ sound.name }}
          </div>
          <button
            class="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold border-none cursor-pointer transition-all duration-200"
            :class="autoPlay ? 'bg-[#e94560] text-white' : 'bg-slate-200 text-slate-500'"
            title="播放完成后自动播放下一首"
            @click="$emit('toggleAutoPlay')"
          >连播</button>
        </div>

        <!-- Progress + time -->
        <div class="flex items-center gap-2">
          <span class="text-[10px] text-slate-400 tabular-nums w-9 text-right flex-shrink-0">{{ current }}</span>
          <div class="relative h-1 flex-1">
            <div class="absolute inset-0 bg-slate-100 rounded-full" />
            <div class="absolute inset-0 bg-slate-200 rounded-full transition-all duration-200" :style="{ width: buffered + '%' }" />
            <div class="absolute inset-0 bg-[#e94560] rounded-full transition-all duration-200" :style="{ width: progress + '%' }" />
            <input type="range" class="absolute inset-0 w-full opacity-0 cursor-pointer" min="0" max="100" :value="progress" @input="onSeek($event)" />
          </div>
          <span class="text-[10px] text-slate-400 tabular-nums w-9 flex-shrink-0">{{ total }}</span>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-1">
          <!-- Share (left) -->
          <button class="w-7 h-7 rounded-full bg-white/60 border-none cursor-pointer text-xs text-slate-500 hover:bg-[#e94560] hover:text-white transition-all duration-200 flex items-center justify-center active:scale-90" title="分享" @click="$emit('share')">↗</button>

          <!-- Prev / Play / Next (center) -->
          <div class="flex items-center gap-1.5 flex-1 justify-center">
            <button class="w-7 h-7 rounded-full bg-white/60 border-none cursor-pointer text-xs text-slate-500 hover:bg-[#e94560] hover:text-white transition-all duration-200 flex items-center justify-center active:scale-90" title="上一首" @click="$emit('prev')">⏮</button>
            <button
              class="w-9 h-9 rounded-full border-none cursor-pointer text-white text-sm flex items-center justify-center transition-all duration-200 active:scale-90"
              :class="isPlaying ? 'bg-emerald-400' : 'bg-[#e94560]'"
              @click="$emit(isPlaying ? 'pause' : 'resume')"
            >{{ isPlaying ? '⏸' : '▶' }}</button>
            <button class="w-7 h-7 rounded-full bg-white/60 border-none cursor-pointer text-xs text-slate-500 hover:bg-[#e94560] hover:text-white transition-all duration-200 flex items-center justify-center active:scale-90" title="下一首" @click="$emit('next')">⏭</button>
          </div>

          <!-- Download + Close (right) -->
          <div class="flex items-center gap-1">
            <button class="w-7 h-7 rounded-full bg-white/60 border-none cursor-pointer text-xs text-slate-500 hover:bg-[#e94560] hover:text-white transition-all duration-200 flex items-center justify-center active:scale-90" title="下载" @click="$emit('download')">⬇</button>
            <button class="sm:hidden w-7 h-7 rounded-full bg-white/60 border-none cursor-pointer text-xs text-slate-400 hover:text-[#e94560] transition-all duration-200 flex items-center justify-center active:scale-90" @click="$emit('close')">✕</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  sound: { name: string } | null
  isPlaying: boolean
  progress: number
  timeDisplay: string
  buffered: number
  autoPlay: boolean
}>()

const emit = defineEmits<{
  close: []; seek: [val: number]; prev: []; next: []; pause: []; resume: []; share: []; download: []; toggleAutoPlay: []
}>()

const current = computed(() => props.timeDisplay.split(' / ')[0] || '00:00')
const total = computed(() => props.timeDisplay.split(' / ')[1] || '00:00')

function onSeek(e: Event) { emit('seek', parseInt((e.target as HTMLInputElement).value)) }
</script>

<style>
.pop-enter-active { transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.pop-leave-active { transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1); }
.pop-enter-from { opacity: 0; transform: translateY(20px) scale(0.88); filter: blur(4px); }
.pop-leave-to { opacity: 0; transform: translateY(12px) scale(0.92); }
</style>
