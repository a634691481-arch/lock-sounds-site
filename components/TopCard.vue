<template>
  <div class="group rounded-3xl border border-white/[0.06] p-5 sm:p-6 transition-all duration-500 hover:border-white/10" style="background: linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%);">
    <p class="text-[10px] tracking-[0.15em] uppercase font-semibold mb-5" :style="{ color: accent || '#ffffff40' }">{{ title }}</p>
    <div class="space-y-1">
      <div
        v-for="(item, i) in items"
        :key="item.id"
        class="flex items-center gap-3 text-xs cursor-pointer rounded-xl px-2 py-2 -mx-2 transition-all duration-300 hover:bg-white/[0.03] group/item"
        @click="$emit('click', item.name)"
      >
        <span
          class="w-6 text-right tabular-nums text-[10px] font-mono flex-shrink-0"
          :class="i === 0 ? 'text-amber-300 font-bold' : i === 1 ? 'text-white/12' : i === 2 ? 'text-amber-600' : 'text-white/10'"
        >{{ i + 1 }}</span>
        <span class="text-white/55 truncate flex-1 group-hover/item:text-white/80 transition-colors">{{ item.name }}</span>
        <span class="text-white/15 tabular-nums flex-shrink-0 text-[10px]">{{ item.count }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; items: { id: string; name: string; count: number }[]; accent?: string }>()
defineEmits<{ click: [name: string] }>()
</script>
