<template>
  <div
    class="min-h-screen relative"
    style="
      background: linear-gradient(
        135deg,
        #fef2f2 0%,
        #fdf2f8 25%,
        #faf5ff 50%,
        #eff6ff 75%,
        #f0fdf4 100%
      );
    "
  >
    <!-- Scroll progress bar -->
    <div class="fixed top-0 left-0 z-[300] h-1" :style="{ width: scrollProgress + '%', background: 'linear-gradient(90deg, #e94560, #f59e0b, #eab308, #22c55e, #06b6d4, #8b5cf6, #e94560)', backgroundSize: '200% 100%', animation: 'rainbow 2s linear infinite' }" />
    <!-- Decorative blobs -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div
        class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-pink-300/20 blur-3xl"
      />
      <div
        class="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-purple-300/15 blur-3xl"
      />
      <div
        class="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-amber-200/15 blur-3xl"
      />
      <div
        class="absolute top-2/3 left-1/3 w-72 h-72 rounded-full bg-emerald-300/12 blur-3xl"
      />
    </div>

    <!-- Glass header -->
    <header class="glass sticky top-0 z-50 border-b border-white/30">
      <div class="max-w-6xl mx-auto px-5 py-3">
        <div class="flex items-center gap-3 mb-3">
          <span class="text-3xl">{{ activeTab === 'sounds' ? '🎵' : '🖼️' }}</span>
          <h1 class="text-2xl font-playful tracking-tight">
            <span class="text-[#e94560]">{{ activeTab === 'sounds' ? '锁车音效' : '车机壁纸' }}</span>
            <span class="text-slate-500 text-lg ml-1 font-normal">分享平台</span>
            <span class="text-amber-600 text-sm ml-3 font-normal whitespace-nowrap">— 蔚来乐道L60 川A·BQ0326 见到请滴滴</span>
          </h1>
        </div>
        <!-- Tab switch -->
        <div class="flex rounded-2xl bg-white/40 p-1 gap-1">
          <button
            class="flex-1 py-2.5 rounded-xl text-sm font-bold border-none cursor-pointer transition-all duration-300"
            :class="activeTab === 'sounds' ? 'bg-[#e94560] text-white shadow-[0_2px_8px_rgba(233,69,96,0.3)]' : 'bg-transparent text-slate-500 hover:text-slate-700'"
            @click="activeTab = 'sounds'"
          >
            <Icon name="play" class="w-4 h-4 inline mr-1" />音效
          </button>
          <button
            class="flex-1 py-2.5 rounded-xl text-sm font-bold border-none cursor-pointer transition-all duration-300"
            :class="activeTab === 'wallpapers' ? 'bg-[#e94560] text-white shadow-[0_2px_8px_rgba(233,69,96,0.3)]' : 'bg-transparent text-slate-500 hover:text-slate-700'"
            @click="activeTab = 'wallpapers'"
          >
            <Icon name="photo" class="w-4 h-4 inline mr-1" />壁纸
          </button>
        </div>
        <SearchBar v-if="activeTab === 'sounds'" v-model="search" class="mt-3" />
        <div v-if="activeTab === 'wallpapers'" class="relative mt-3">
          <Icon name="magnifying-glass" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            v-model="wallpaperSearch"
            type="text"
            placeholder="搜索壁纸..."
            class="w-full pl-12 pr-5 py-3.5 bg-white rounded-2xl border-2 border-slate-200 outline-none text-slate-700 text-base placeholder:text-slate-400 shadow-[0_2px_12px_rgba(0,0,0,0.06)] focus:border-[#e94560] focus:shadow-[0_4px_20px_rgba(233,69,96,0.15)] transition-all duration-200"
          />
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-5 relative z-10">
      <!-- Wallpaper mode -->
      <div v-if="activeTab === 'wallpapers'" class="py-4">
        <WallpaperGrid :search="wallpaperSearch" />
      </div>

      <!-- Sounds mode -->
      <template v-else>
      <!-- Loading skeleton -->
      <div v-if="loading" class="space-y-4 py-4">
        <div class="flex gap-2 py-3">
          <div
            v-for="n in 6"
            :key="n"
            class="h-9 w-24 rounded-full bg-white/60 backdrop-blur-sm animate-pulse"
          />
        </div>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-3">
          <div
            v-for="n in 6"
            :key="n"
            class="glass-card p-4 flex gap-3 animate-pulse"
          >
            <div class="w-12 h-12 rounded-full bg-white/80 flex-shrink-0" />
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-white/80 rounded w-3/4" />
              <div class="h-3 bg-white/60 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-32">
        <div class="flex justify-center mb-4"><Icon name="exclamation-triangle" class="w-12 h-12 text-slate-300" /></div>
        <p class="text-slate-500 mb-6">{{ error }}</p>
        <button
          class="px-8 py-3 glass font-playful text-lg text-[#e94560] border-white/40 cursor-pointer hover:bg-white/90 transition-all duration-200 active:scale-95"
          @click="fetchData"
        >
          重新加载
        </button>
      </div>

      <!-- Content -->
      <template v-else>
        <!-- Intro paragraph -->
        <div class="py-4 text-center">
          <p class="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
            锁车音效分享平台，收录 <strong class="text-[#e94560]">{{ grandTotal || totalCount }}</strong> 款个性锁车音效。支持在线试听、免费下载，涵盖搞笑、游戏、动漫、动物城AI等多种分类，让你的锁车声音与众不同。
          </p>
        </div>

        <!-- Sticky filter bar — 2 rows -->
        <div
          class="z-40 -mx-5 px-5 pt-2 pb-2 space-y-3 bg-gradient-to-b backdrop-blur-md"
        >
          <!-- Row 1: Sort -->
          <div class="flex items-center gap-2">
            <span
              class="text-[10px] text-slate-400 uppercase tracking-wider font-bold flex-shrink-0"
              >排序</span
            >
            <button
              v-for="opt in sortOptions"
              :key="opt.value"
              :class="[
                'px-3 py-1.5 rounded-full text-xs font-semibold border-none cursor-pointer transition-all duration-200',
                sort === opt.value
                  ? 'bg-[#e94560] text-white shadow-[0_1px_6px_rgba(233,69,96,0.3)]'
                  : 'bg-white/70 text-slate-500 hover:bg-white hover:text-slate-700',
              ]"
              @click="
                sort = opt.value;
                page = 1;
                fetchSounds();
              "
            >
              {{ opt.label }}
            </button>
            <span class="text-[10px] text-slate-300 ml-auto flex-shrink-0"
              >共 {{ totalCount }}</span
            >
          </div>

          <!-- Row 2: Categories + Recently played -->
          <div class="flex items-center gap-1.5">
            <div ref="categoryScroll" class="flex gap-1 overflow-x-auto flex-1 scrollbar-hide">
              <button
                v-for="cat in filterTabs"
                :key="cat.name"
                :class="[
                  'px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border-none cursor-pointer flex-shrink-0',
                  activeCategory === cat.name
                    ? 'bg-[#e94560] text-white shadow-[0_1px_6px_rgba(233,69,96,0.3)]'
                    : 'bg-white/70 text-slate-500 hover:bg-white/90',
                ]"
                @click="(e) => handleCategorySelect(cat.name, e)"
              >
                {{ cat.name
                }}<span class="opacity-60 ml-0.5">{{ cat.count }}</span>
              </button>
            </div>
            <button
              v-if="recentSounds.length && activeCategory === '全部' && !search"
              :class="[
                'flex-shrink-0 px-2.5 py-1.5 rounded-full text-xs font-semibold border-none cursor-pointer transition-colors',
                showRecent
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-white/70 text-amber-600 hover:bg-amber-50',
              ]"
              @click="toggleRecent"
            >
              🕐 最近
            </button>
          </div>
        </div>

        <!-- Recently played expanded -->
        <div v-if="showRecent && recentSounds.length" class="py-2">
          <div class="flex items-center gap-2 mb-2">
            <span
              class="text-xs text-slate-400 font-semibold tracking-wide uppercase"
              >🕐 最近播放 · {{ recentSounds.length }} 首</span
            >
            <button
              class="text-[10px] text-[#e94560] border-none bg-transparent cursor-pointer hover:underline"
              @click="showRecent = false"
            >
              收起
            </button>
          </div>
          <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              v-for="s in recentSounds"
              :key="'r-' + s.id"
              class="flex-shrink-0 px-3 py-1.5 rounded-full bg-white/60 text-sm border-none cursor-pointer hover:bg-white hover:scale-105 transition-all duration-200 text-slate-600 truncate max-w-[200px]"
              :title="s.name"
              @click="playSound(s)"
            >
              {{ s.name }}
            </button>
          </div>
        </div>

        <!-- Sound cards — asymmetric bento + blur-in -->
        <h2 class="text-lg font-bold text-slate-700 mt-4 mb-2">全部音效</h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-16 pt-2"
        >
          <div
            v-for="(sound, i) in sounds"
            :key="sound.id"
            :ref="(el) => { if (el) cardRefs[i] = el as HTMLElement }"
          >
            <SoundCard
              :sound="sound"
              :is-playing="player.playingId.value === sound.id"
              :is-buffering="player.bufferingId.value === sound.id"
              @play="playSound"
              @download="handleDownload"
            />
          </div>
        </div>

        <!-- Empty -->
        <div v-if="sounds.length === 0" class="text-center py-32">
          <div class="flex justify-center mb-4"><Icon name="magnifying-glass" class="w-12 h-12 text-slate-300" /></div>
          <p class="text-slate-400 font-playful text-lg">没有匹配的音效</p>
          <p class="text-slate-300 text-sm mt-1">换换搜索词试试？</p>
        </div>

        <!-- Load more -->
        <div v-if="hasMore" class="text-center pb-10">
          <button
            class="px-10 py-3 glass font-playful text-[#e94560] border-white/40 cursor-pointer hover:bg-white/90 hover:scale-105 transition-all duration-200 text-lg active:scale-95"
            :disabled="loadingMore"
            @click="loadMore"
          >
            {{
              loadingMore
                ? "加载中..."
                : `查看更多 (${sounds.length}/${totalCount})`
            }}
          </button>
        </div>
      </template>
      </template>
    </main>

    <footer class="max-w-6xl mx-auto px-5 pb-8 pt-4 text-center text-xs text-slate-400 relative z-10">
      <p>锁车音效分享平台 &copy; {{ new Date().getFullYear() }} — 海量个性锁车音效，免费在线试听与下载</p>
    </footer>

    <!-- Floating buttons -->
    <div
      class="fixed z-[999] left-5 flex flex-col gap-3"
      :class="player.currentSound.value ? 'bottom-[230px] sm:bottom-20' : 'bottom-20 sm:bottom-5'"
    >
      <button
        class="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#e94560] ring-4 ring-white/60 shadow-[0_4px_16px_rgba(233,69,96,0.5)] cursor-pointer text-white text-sm sm:text-lg hover:scale-110 hover:shadow-[0_8px_28px_rgba(233,69,96,0.6)] transition-all duration-300 ease-spring flex items-center justify-center border-none"
        title="回到顶部"
        @click="scrollToTop"
      >
        <Icon name="arrow-up" class="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        class="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#e94560] ring-4 ring-white/60 shadow-[0_4px_16px_rgba(233,69,96,0.5)] cursor-pointer text-white text-sm sm:text-lg hover:scale-110 hover:shadow-[0_8px_28px_rgba(233,69,96,0.6)] transition-all duration-300 ease-spring flex items-center justify-center border-none"
        title="反馈与建议"
        @click="showFeedback = true"
      >
        <Icon name="chat-bubble-left-ellipsis" class="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>

    <!-- Feedback modal -->
    <FeedbackModal v-model="showFeedback" />

    <AudioPlayer
      :sound="player.currentSound.value"
      :is-playing="!!player.playingId.value"
      :progress="player.progress.value"
      :time-display="player.timeDisplay.value"
      :buffered="player.buffered.value"
      :auto-play="autoPlay"
      @close="player.stop()"
      @seek="(v: number) => player.seek(v)"
      @prev="playPrev"
      @next="playNext"
      @pause="player.play(player.currentSound.value!)"
      @resume="player.play(player.currentSound.value!)"
      @download="player.currentSound.value && handleDownload(player.currentSound.value)"
      @share="handleShare"
      @toggle-auto-play="autoPlay = !autoPlay"
    />
  </div>
</template>

<script setup lang="ts">
import type { Sound, Category, SortType } from "~/types/sound";

let gsap: any = null
let ScrollTrigger: any = null

async function loadGSAP() {
  if (gsap) return
  const mod = await import('gsap')
  gsap = mod.default
  ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)
}

const RECENT_KEY = "lock-sounds-recent";
const MAX_RECENT = 20;

const search = ref("");
const activeCategory = ref("全部");
const sort = ref<SortType>("plays");
const page = ref(1);
const totalCount = ref(0);
const grandTotal = ref(0);
const totalPages = ref(0);
const loading = ref(true);
const loadingMore = ref(false);
const error = ref("");
const sounds = ref<Sound[]>([]);
const categories = ref<Category[]>([]);
const recentSounds = ref<Sound[]>([]);

useSeoMeta({
  title: () => activeCategory.value === '全部'
    ? '锁车音效分享平台 - 个性锁车音效免费在线试听下载'
    : `${activeCategory.value} - 锁车音效分享平台`,
  description: () => activeCategory.value === '全部'
    ? `锁车音效分享平台，收录${totalCount.value}款个性锁车音效。在线试听、免费下载，每日更新热门音效。`
    : `${activeCategory.value}分类锁车音效，在线试听免费下载`,
  ogTitle: () => activeCategory.value === '全部'
    ? '锁车音效分享平台 - 个性锁车音效免费在线试听下载'
    : `${activeCategory.value}锁车音效 - 锁车音效分享平台`,
  ogDescription: () => '海量个性锁车音效免费试听下载，650+款热门音效每日更新',
  ogType: 'website',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://lock-sounds.vercel.app' }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: '锁车音效分享平台',
      url: 'https://lock-sounds.vercel.app',
      description: '海量个性锁车音效免费在线试听与下载平台',
      applicationCategory: 'Multimedia',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'CNY' },
    }),
  }],
})

const player = useAudioPlayer();
const pageSize = 60;

const hasMore = computed(() => page.value < totalPages.value);

const sortOptions: { label: string; value: SortType }[] = [
  { label: "最热", value: "plays" },
  { label: "最新", value: "latest" },
  { label: "下载", value: "downloads" },
];

const showRecent = ref(false);

const filterTabs = computed(() => {
  const total = grandTotal.value || totalCount.value;
  return [{ name: "全部", count: total }, ...categories.value];
});

function toggleRecent() {
  showRecent.value = !showRecent.value;
}

function loadRecent() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (raw) recentSounds.value = JSON.parse(raw);
  } catch {}
}

function saveRecent(sound: Sound) {
  const list = [
    sound,
    ...recentSounds.value.filter((s) => s.id !== sound.id),
  ].slice(0, MAX_RECENT);
  recentSounds.value = list;
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  } catch {}
}

async function fetchSounds() {
  try {
    const res = await $fetch<{
      items: Sound[];
      total: number;
      totalPages: number;
    }>("/api/sounds", {
      query: {
        search: search.value,
        category: activeCategory.value,
        sort: sort.value,
        page: page.value,
        pageSize,
      },
    });
    sounds.value = res.items;
    totalCount.value = res.total;
    totalPages.value = res.totalPages;
    if (activeCategory.value === '全部' && !search.value) {
      grandTotal.value = res.total;
    }
  } catch (e: any) {
    error.value = e?.message || "数据加载失败";
  }
}

async function fetchCategories() {
  try {
    categories.value = await $fetch<Category[]>("/api/categories");
  } catch {}
}

async function fetchData() {
  loading.value = true;
  error.value = "";
  page.value = 1;
  await Promise.all([fetchSounds(), fetchCategories()]);
  loading.value = false;
}

async function loadMore() {
  if (loadingMore.value || !hasMore.value) return;
  loadingMore.value = true;
  page.value++;
  try {
    const res = await $fetch<{ items: Sound[] }>("/api/sounds", {
      query: {
        search: search.value,
        category: activeCategory.value,
        sort: sort.value,
        page: page.value,
        pageSize,
      },
    });
    sounds.value.push(...res.items);
  } catch {}
  loadingMore.value = false;
}

const categoryScroll = ref<HTMLElement | null>(null)

function handleCategorySelect(cat: string, e: MouseEvent) {
  activeCategory.value = cat;
  page.value = 1;
  loading.value = true;
  error.value = "";
  Promise.all([fetchSounds(), fetchCategories()]);
  loading.value = false;
  (e.target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
}

function playSound(sound: Sound) {
  player.play(sound);
  saveRecent(sound);
}

function handleDownload(sound: Sound) {
  const a = document.createElement("a");
  a.href = player.getAudioUrl(sound);
  a.download = sound.file;
  a.click();
  useToast().success(`开始下载 ${sound.name}`)
}

function handleDownloadFromPlayer() {
  if (player.currentSound.value) handleDownload(player.currentSound.value)
}

function handleShare() {
  const url = `${window.location.origin}${window.location.pathname}`
  navigator.clipboard.writeText(url).then(() => {
    useToast().success('链接已复制到剪贴板')
  }).catch(() => {
    useToast().error('复制失败')
  })
}

function playAdjacent(offset: number) {
  const current = player.currentSound.value
  if (!current || !sounds.value.length) return
  const idx = sounds.value.findIndex(s => s.id === current.id)
  if (idx === -1) return
  const nextIdx = idx + offset
  if (nextIdx < 0 || nextIdx >= sounds.value.length) return
  playSound(sounds.value[nextIdx])
}

function playPrev() { playAdjacent(-1) }
function playNext() { playAdjacent(1) }

function onKeydown(e: KeyboardEvent) {
  if (e.target instanceof HTMLInputElement) return;
  if (e.code === "Space") {
    e.preventDefault();
    if (player.playingId.value) {
      player.play(player.currentSound.value!);
    }
  } else if (e.code === "ArrowRight") {
    e.preventDefault();
    player.seek(Math.min(player.progress.value + 5, 100));
  } else if (e.code === "ArrowLeft") {
    e.preventDefault();
    player.seek(Math.max(player.progress.value - 5, 0));
  }
}

watch([search], () => {
  page.value = 1;
  fetchSounds();
});

const cardRefs = ref<Record<number, HTMLElement>>({})
const scrollProgress = ref(0)
const autoPlay = ref(true)
const activeTab = ref<'sounds' | 'wallpapers'>('sounds')
const wallpaperSearch = ref('')
const showFeedback = ref(false)

function updateScrollProgress() {
  const h = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = h > 0 ? (window.scrollY / h) * 100 : 0
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  loadRecent();
  fetchData();
  window.addEventListener("keydown", onKeydown);
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  player.onAutoNext = () => playAdjacent(1);
});

onUnmounted(() => {
  player.stop();
  window.removeEventListener("keydown", onKeydown);
  if (ScrollTrigger) ScrollTrigger.getAll().forEach((t: any) => t.kill())
});

// GSAP scroll-triggered card entrance
watch(sounds, async () => {
  await loadGSAP()
  nextTick(() => {
    const elements = Object.values(cardRefs.value)
    if (!elements.length) return
    gsap.fromTo(elements, 
      { opacity: 0, y: 40, filter: 'blur(6px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.7,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elements[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    )
  })
})
</script>
<style>
@keyframes rainbow {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
