<template>
  <nav
    class="fixed top-0 inset-x-0 z-[200] py-2 sm:pb-0 transition-all duration-300"
    :class="scrolled ? 'bg-[#09090b]/85 backdrop-blur-xl' : ''"
  >
    <div class="max-w-7xl mx-auto px-5 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2.5 no-underline group">
        <span
          class="w-9 h-9 rounded-xl bg-[#e94560] flex items-center justify-center text-white text-sm font-black tracking-tighter shadow-lg shadow-[#e94560]/30"
          >L</span
        >
        <span class="font-playful text-lg text-white drop-shadow-sm"
          >LockSounds</span
        >
      </NuxtLink>

      <div
        class="hidden sm:flex items-center gap-1 bg-white/8 backdrop-blur-xl rounded-full px-1.5 py-1.5 border border-white/10 shadow-2xl shadow-black/20"
      >
        <NuxtLink
          to="/"
          exact-active-class="!bg-[#e94560]/90 !text-white"
          class="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white transition-all duration-300 no-underline"
        >
          首页
        </NuxtLink>
        <NuxtLink
          to="/wallpapers"
          active-class="!bg-[#e94560]/90 !text-white"
          class="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white transition-all duration-300 no-underline"
        >
          壁纸
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const scrolled = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 20;
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>
