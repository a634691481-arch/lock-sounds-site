<template>
  <div v-if="items.length" class="rounded-2xl bg-white/[0.03] border border-white/5 p-5">
    <p class="text-white/30 text-[10px] uppercase tracking-wider mb-3">{{ title }}</p>
    <div class="space-y-1">
      <div
        v-for="(item, i) in items"
        :key="item.id"
        class="flex items-center gap-2.5 text-xs cursor-pointer hover:bg-white/[0.04] rounded-lg px-2 py-1.5 -mx-2 transition-colors group"
        @click="$emit('click', item.name)"
      >
        <span
          class="w-5 text-right tabular-nums text-[10px] font-mono flex-shrink-0"
          :class="rankColor(i)"
        >{{ i + 1 }}</span>
        <span class="text-white/75 truncate flex-1 group-hover:text-white transition-colors">{{ item.name }}</span>
        <span class="text-white/20 tabular-nums flex-shrink-0 text-[10px]">{{ item.count }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; items: { id: string; name: string; count: number }[] }>()
defineEmits<{ click: [name: string] }>()

function rankColor(i: number) {
  if (i === 0) return 'text-amber-300 font-bold'
  if (i === 1) return 'text-white/15'
  if (i === 2) return 'text-amber-600'
  return 'text-white/15'
}
</script>
