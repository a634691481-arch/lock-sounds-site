<template>
  <Teleport to="body">
    <div class="fixed top-5 right-5 z-[300] flex flex-col gap-2 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="t in toasts"
          :key="t.id"
          :class="[
            'pointer-events-auto px-5 py-3 rounded-2xl text-sm font-semibold shadow-lg backdrop-blur-md flex items-center gap-2 max-w-sm',
            t.type === 'success' ? 'bg-emerald-500/90 text-white' :
            t.type === 'error' ? 'bg-red-500/90 text-white' :
            'bg-white/90 text-slate-700 border border-white/30'
          ]"
        >
          <span>{{ icon(t.type) }}</span>
          <span class="flex-1">{{ t.message }}</span>
          <button
            class="bg-transparent border-none cursor-pointer text-white/70 hover:text-white text-sm ml-1"
            @click="dismiss(t.id)"
          >
            ✕
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { ToastType } from '~/composables/useToast'

const { toasts, dismiss } = useToast()

function icon(type: ToastType): string {
  switch (type) {
    case 'success': return '✅'
    case 'error': return '❌'
    case 'info': return 'ℹ️'
  }
}
</script>

<style>
.toast-enter-active { transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { transition: all 0.2s ease-in; }
.toast-enter-from { opacity: 0; transform: translateX(40px) scale(0.9); }
.toast-leave-to { opacity: 0; transform: translateX(20px) scale(0.92); }
</style>
