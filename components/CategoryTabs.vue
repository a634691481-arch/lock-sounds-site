<template>
  <div class="flex gap-2 py-3 flex-wrap">
    <button
      v-for="cat in tabs"
      :key="cat.name"
      :class="[
        'px-5 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200 border-none cursor-pointer font-semibold',
        active === cat.name
          ? 'bg-[#e94560] text-white shadow-[0_2px_12px_rgba(233,69,96,0.35)] scale-105'
          : 'glass-sm text-slate-500 hover:bg-white/80 hover:scale-105 active:scale-95'
      ]"
      @click="$emit('select', cat.name)"
    >
      {{ cat.name }}
      <span class="opacity-70 ml-1 text-xs">({{ cat.count }})</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/types/sound'

const props = defineProps<{ categories: Category[]; active: string }>()
defineEmits<{ select: [name: string] }>()

const totalCount = computed(() => props.categories.reduce((sum, c) => sum + c.count, 0))

const tabs = computed(() => [
  { name: '全部', count: totalCount.value },
  ...props.categories
])
</script>
