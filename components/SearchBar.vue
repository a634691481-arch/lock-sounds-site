<template>
  <div class="relative">
    <Icon name="magnifying-glass" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
    <input
      :value="modelValue"
      type="text"
      placeholder="搜索你喜欢的音效..."
      class="w-full pl-12 pr-5 py-3.5 bg-white rounded-2xl border-2 border-slate-200 outline-none text-slate-700 text-base placeholder:text-slate-400 shadow-[0_2px_12px_rgba(0,0,0,0.06)] focus:border-[#e94560] focus:shadow-[0_4px_20px_rgba(233,69,96,0.15)] transition-all duration-200"
      @input="onInput"
    />
    <button
      v-if="modelValue"
      class="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-300/60 text-white text-xs flex items-center justify-center border-none cursor-pointer hover:bg-[#e94560] transition-colors"
      @click="clear"
    >
      <Icon name="x-mark" class="w-3.5 h-3.5" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

let debounceTimer: ReturnType<typeof setTimeout> | null = null

function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => emit('update:modelValue', val), 300)
}

function clear() {
  if (debounceTimer) clearTimeout(debounceTimer)
  emit('update:modelValue', '')
}
</script>
