<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="wallpaper" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" @click.self="close">
        <div class="relative w-full max-w-4xl max-h-[90vh] flex flex-col">
          <!-- Close button -->
          <button class="absolute -top-10 right-0 bg-transparent border-none text-white/70 hover:text-white cursor-pointer text-2xl z-10" @click="close"><Icon name="x-mark" class="w-6 h-6" /></button>

          <!-- Image -->
          <div class="flex-1 min-h-0 flex items-center justify-center">
            <img
              :src="wallpaper.medium"
              :alt="wallpaper.title"
              class="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
          </div>

          <!-- Info bar -->
          <div class="flex items-center justify-between mt-3 px-2">
            <div class="text-white/80 text-sm">
              <span class="font-bold text-white">{{ wallpaper.title }}</span>
              <span class="mx-2 text-white/30">|</span>
              <span>{{ wallpaper.width }}×{{ wallpaper.height }}</span>
            </div>
            <div class="flex items-center gap-2">
              <a
                :href="wallpaper.medium"
                :download="`${wallpaper.title}.jpg`"
                class="flex items-center gap-1.5 px-4 py-2 bg-[#e94560] hover:bg-[#d63850] text-white rounded-full text-sm font-semibold no-underline transition-colors cursor-pointer"
                target="_blank"
              >
                <Icon name="arrow-down-tray" class="w-4 h-4" />
                下载壁纸
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Wallpaper } from '~/types/wallpaper'

const wallpaper = defineModel<Wallpaper | null>()

function close() { wallpaper.value = null }
</script>

<style scoped>
.modal-enter-active { transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
.modal-leave-active { transition: all 0.15s ease-in; }
.modal-enter-from { opacity: 0; }
.modal-enter-from > div { opacity: 0; transform: scale(0.92); }
.modal-leave-to { opacity: 0; }
</style>
