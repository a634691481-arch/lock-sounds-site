<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" style="grid-auto-flow: dense;">
    <!-- Large featured card -->
    <div
      v-for="card in cards"
      :key="card.id"
      :class="[
        'group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-out',
        'hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/30',
        'border border-white/5',
        card.colSpan === 2 ? 'sm:col-span-2' : '',
        card.rowSpan === 2 ? 'sm:row-span-2' : '',
      ]"
      :style="{ background: card.bg || '#1a1a24' }"
      @click="card.onClick?.()"
    >
      <!-- Background image with overlay -->
      <div class="absolute inset-0 z-0">
        <img
          v-if="card.image"
          :src="card.image"
          alt=""
          class="w-full h-full object-cover opacity-60 transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:opacity-80"
          loading="lazy"
          decoding="async"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col h-full" :class="card.rowSpan === 2 ? 'p-6 sm:p-8' : 'p-5 sm:p-6'">
        <!-- Top row: icon or tag -->
        <div class="flex items-center gap-2 mb-auto">
          <span
            v-if="card.badge"
            class="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase border"
            :style="{ color: card.badgeColor || '#e94560', borderColor: card.badgeColor ? `${card.badgeColor}30` : '#e9456030', background: card.badgeColor ? `${card.badgeColor}10` : '#e9456010' }"
          >
            {{ card.badge }}
          </span>
          <Icon v-if="card.icon" :name="card.icon" :class="card.rowSpan === 2 ? 'w-5 h-5' : 'w-4 h-4'" style="color: #e94560;" />
        </div>

        <!-- Bottom content -->
        <div class="mt-4">
          <h3
            :class="card.rowSpan === 2 ? 'text-xl sm:text-2xl mb-3' : 'text-base sm:text-lg mb-2'"
            class="font-bold text-white leading-tight"
          >
            {{ card.title }}
          </h3>
          <p
            v-if="card.subtitle"
            class="text-xs sm:text-sm text-white/40 leading-relaxed"
            :class="card.rowSpan === 2 ? 'line-clamp-3' : 'line-clamp-2'"
          >
            {{ card.subtitle }}
          </p>
          <div
            v-if="card.stat"
            class="mt-3 flex items-baseline gap-1"
          >
            <span class="text-2xl sm:text-3xl font-black text-white tracking-tight">{{ card.stat }}</span>
            <span v-if="card.statLabel" class="text-xs text-white/35">{{ card.statLabel }}</span>
          </div>
        </div>

        <!-- Play button overlay -->
        <div
          v-if="card.playable"
          class="absolute bottom-5 right-5 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e94560] flex items-center justify-center shadow-lg shadow-[#e94560]/40 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out translate-y-2 group-hover:translate-y-0"
        >
          <Icon name="play" class="w-5 h-5 text-white ml-0.5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface BentoCard {
  id: string | number
  title: string
  subtitle?: string
  image?: string
  icon?: string
  badge?: string
  badgeColor?: string
  stat?: string
  statLabel?: string
  bg?: string
  colSpan?: number
  rowSpan?: number
  playable?: boolean
  onClick?: () => void
}

defineProps<{ cards: BentoCard[] }>()
</script>
