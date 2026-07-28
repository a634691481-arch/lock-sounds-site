<template>
  <footer class="relative" :style="{ background: props.bg || '#09090b' }">
    <!-- Action CTA -->
    <div class="max-w-5xl mx-auto px-5 py-24 sm:py-32 text-center">
      <h2 class="text-[clamp(1.8rem,4vw,3rem)] font-playful text-white leading-tight mb-6">
        {{ props.ctaTitle || '准备好让你的车与众不同了吗？' }}
      </h2>
      <p class="text-white/40 text-base sm:text-lg max-w-lg mx-auto mb-10">
        {{ props.ctaDesc || '数千款精选音效与壁纸，完全免费在线试听下载。加入我们的车友社区！' }}
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <a
          href="#"
          class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#e94560] text-white font-bold text-sm no-underline hover:scale-105 hover:shadow-2xl hover:shadow-[#e94560]/40 transition-all duration-500 ease-out"
          @click.prevent="$emit('cta')"
        >
          立即体验
          <Icon name="arrow-right" class="w-4 h-4" />
        </a>
        <button
          class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 text-white font-semibold text-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 ease-out"
          @click="$emit('feedback')"
        >
          <Icon name="chat-bubble-left-ellipsis" class="w-4 h-4" />
          反馈建议
        </button>
      </div>
    </div>

    <!-- Divider -->
    <div class="max-w-7xl mx-auto px-5">
      <hr class="border-white/5" />
    </div>

    <!-- Bottom bar -->
    <div class="max-w-6xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded-md bg-[#e94560] flex items-center justify-center text-white text-[10px] font-black">L</span>
        <span class="text-xs text-white/25">&copy; {{ new Date().getFullYear() }} LockSounds</span>
      </div>
      <div class="flex items-center gap-6">
        <NuxtLink to="/" class="text-xs text-white/25 hover:text-white/50 transition-colors no-underline">首页</NuxtLink>
        <NuxtLink to="/wallpapers" class="text-xs text-white/25 hover:text-white/50 transition-colors no-underline">壁纸</NuxtLink>
        <button class="text-xs text-white/25 hover:text-white/50 transition-colors" @click="$emit('feedback')">反馈</button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const props = defineProps<{
  bg?: string
  ctaTitle?: string
  ctaDesc?: string
}>()

defineEmits<{ cta: []; feedback: [] }>()
</script>
