<template>
  <div class="relative w-full overflow-hidden py-6 sm:py-10 select-none" :style="{ background: props.bg || '#0c0c14' }">
    <div
      class="flex gap-8 whitespace-nowrap"
      style="animation: marquee var(--speed, 30s) linear infinite"
      :style="{ '--speed': (props.speed || 30) + 's' }"
    >
      <template v-for="i in 2" :key="i">
        <span
          v-for="(item, idx) in props.items"
          :key="`${i}-${idx}`"
          class="flex items-center gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold"
          :style="{ color: props.textColor || '#ffffff15' }"
        >
          {{ item }}
          <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" :style="{ background: props.dotColor || '#e9456040' }" />
        </span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: string[]
  speed?: number
  bg?: string
  textColor?: string
  dotColor?: string
}>()
</script>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>