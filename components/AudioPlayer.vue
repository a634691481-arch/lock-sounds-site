<template>
  <Transition name="pop">
    <div
      v-if="sound"
      class="fixed z-[200] rounded-2xl border border-white/10 shadow-2xl shadow-black/40
        bottom-0 left-0 right-0 rounded-b-none bg-[#12121a]/95 backdrop-blur-xl
        sm:bottom-5 sm:left-auto sm:right-5 sm:w-80 sm:rounded-b-2xl"
    >
      <div class="px-4 py-3.5 flex flex-col gap-3">
        <!-- Header -->
        <div class="hidden sm:flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="w-1 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span class="text-[10px] tracking-wide uppercase text-white/40 font-semibold">正在播放</span>
          </div>
          <button class="bg-transparent border-none text-white/30 hover:text-white cursor-pointer transition-colors" @click="$emit('close')"><Icon name="x-mark" class="w-3.5 h-3.5" /></button>
        </div>

        <!-- Track name -->
        <div class="flex items-center gap-2">
          <div class="font-bold text-xs sm:text-sm text-white truncate leading-snug flex-1 min-w-0" :title="sound.name">
            {{ sound.name }}
          </div>
          <button
            class="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold border-none cursor-pointer transition-all duration-200"
            :class="autoPlay ? 'bg-[#e94560] text-white' : 'bg-white/8 text-white/35'"
            title="播放完成后自动播放下一首"
            @click="$emit('toggleAutoPlay')"
          >连播</button>
        </div>

        <!-- Progress + time -->
        <div class="flex items-center gap-2">
          <span class="text-[10px] text-white/30 tabular-nums w-9 text-right flex-shrink-0">{{ current }}</span>
          <div class="relative h-1 flex-1">
            <div class="absolute inset-0 bg-white/10 rounded-full" />
            <div class="absolute inset-0 bg-white/15 rounded-full transition-all duration-200" :style="{ width: buffered + '%' }" />
            <div class="absolute inset-0 bg-[#e94560] rounded-full transition-all duration-200" :style="{ width: progress + '%' }" />
            <input type="range" class="absolute inset-0 w-full opacity-0 cursor-pointer" min="0" max="100" :value="progress" @input="onSeek($event)" />
          </div>
          <span class="text-[10px] text-white/30 tabular-nums w-9 flex-shrink-0">{{ total }}</span>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-1">
          <button class="w-7 h-7 rounded-full bg-white/8 border-none cursor-pointer text-white/40 hover:bg-[#e94560] hover:text-white transition-all duration-200 flex items-center justify-center active:scale-90" title="分享" @click="$emit('share')"><Icon name="arrow-top-right-on-square" class="w-3.5 h-3.5" /></button>

          <div class="flex items-center gap-1.5 flex-1 justify-center">
            <button class="w-7 h-7 rounded-full bg-white/8 border-none cursor-pointer text-white/40 hover:bg-[#e94560] hover:text-white transition-all duration-200 flex items-center justify-center active:scale-90" title="上一首" @click="$emit('prev')"><Icon name="backward" class="w-3.5 h-3.5" /></button>
            <button
              class="w-9 h-9 rounded-full border-none cursor-pointer text-white text-sm flex items-center justify-center transition-all duration-200 active:scale-90"
              :class="isPlaying ? 'bg-emerald-400' : 'bg-[#e94560]'"
              @click="$emit(isPlaying ? 'pause' : 'resume')"
            ><Icon :name="isPlaying ? 'pause' : 'play'" class="w-5 h-5" /></button>
            <button class="w-7 h-7 rounded-full bg-white/8 border-none cursor-pointer text-white/40 hover:bg-[#e94560] hover:text-white transition-all duration-200 flex items-center justify-center active:scale-90" title="下一首" @click="$emit('next')"><Icon name="forward" class="w-3.5 h-3.5" /></button>
          </div>

          <div class="flex items-center gap-1">
            <button class="w-7 h-7 rounded-full bg-white/8 border-none cursor-pointer text-white/40 hover:bg-[#e94560] hover:text-white transition-all duration-200 flex items-center justify-center active:scale-90" title="下载" @click="$emit('download')"><Icon name="arrow-down-tray" class="w-3.5 h-3.5" /></button>
            <button class="sm:hidden w-7 h-7 rounded-full bg-white/8 border-none cursor-pointer text-white/40 hover:text-[#e94560] transition-all duration-200 flex items-center justify-center active:scale-90" @click="$emit('close')"><Icon name="x-mark" class="w-3.5 h-3.5" /></button>
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
