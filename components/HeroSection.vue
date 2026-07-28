<template>
  <section class="relative overflow-hidden" :style="{ background: props.bgColor || '#09090b' }">
    <div
      class="absolute inset-0 z-0"
      :style="{
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${props.glowColor || '#e9456020'} 0%, transparent 70%)`,
      }"
    />

    <div
      v-if="props.bgImage"
      class="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[85%] z-0 hidden lg:block"
    >
      <div class="absolute inset-0 bg-gradient-to-l from-transparent via-[#09090b]/60 to-[#09090b] z-10" />
      <img
        :src="props.bgImage"
        alt=""
        class="w-full h-full object-cover opacity-40 blur-sm scale-110"
        loading="lazy"
        decoding="async"
      />
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-5 pt-32 pb-24 sm:pt-44 sm:pb-36 md:pt-52 md:pb-44">
      <div class="max-w-4xl">
        <p
          v-if="props.overline"
          class="text-xs sm:text-sm tracking-[0.2em] uppercase text-white/50 font-semibold mb-6"
        >
          {{ props.overline }}
        </p>

        <h1
          class="font-playful text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.92] tracking-tight text-white mb-8"
          :style="{ fontFamily: 'ZCOOL KuaiLe, sans-serif' }"
        >
          {{ props.title }}
        </h1>

        <p
          v-if="props.subtitle"
          class="text-base sm:text-lg text-white/55 leading-relaxed max-w-xl mb-10"
        >
          {{ props.subtitle }}
        </p>

        <div v-if="props.showCtas" class="flex flex-wrap gap-4">
          <a
            v-if="props.ctaPrimary"
            :href="props.ctaPrimaryHref || '#'"
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#09090b] font-bold text-sm no-underline hover:scale-105 hover:shadow-xl hover:shadow-white/20 transition-all duration-500 ease-out"
          >
            {{ props.ctaPrimary }}
            <Icon name="arrow-right" class="w-4 h-4" />
          </a>
          <a
            v-if="props.ctaSecondary"
            :href="props.ctaSecondaryHref || '#'"
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/5 backdrop-blur-sm text-white font-semibold text-sm no-underline border border-white/15 hover:bg-white/10 hover:border-white/25 transition-all duration-500 ease-out"
          >
            {{ props.ctaSecondary }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  overline?: string
  subtitle?: string
  showCtas?: boolean
  ctaPrimary?: string
  ctaPrimaryHref?: string
  ctaSecondary?: string
  ctaSecondaryHref?: string
  bgColor?: string
  glowColor?: string
  bgImage?: string
}>()
</script>
