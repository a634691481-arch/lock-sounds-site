<template>
  <main class="min-h-screen bg-[#09090b]">
    <AppNav />

    <div class="max-w-lg mx-auto px-5 pt-32 pb-24">
      <h1 class="text-2xl font-bold text-white mb-2">上传资源</h1>
      <p class="text-sm text-white/40 mb-10">上传音效或壁纸到 GitHub 仓库，自动写入数据库。</p>

      <!-- Type toggle -->
      <div class="flex gap-1 mb-8 bg-white/5 rounded-xl p-1 border border-white/5">
        <button
          class="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all"
          :class="type === 'sound' ? 'bg-[#e94560] text-white' : 'text-white/40 hover:text-white/70'"
          @click="switchType('sound')"
        >音效</button>
        <button
          class="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all"
          :class="type === 'wallpaper' ? 'bg-[#e94560] text-white' : 'text-white/40 hover:text-white/70'"
          @click="switchType('wallpaper')"
        >壁纸</button>
      </div>

      <!-- Drop zone -->
      <div
        class="relative border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer mb-6"
        :class="dragOver ? 'border-[#e94560] bg-[#e94560]/5' : 'border-white/10 hover:border-white/20'"
        @dragover.prevent="dragOver = true"
        @dragleave="dragOver = false"
        @drop.prevent="onDrop"
        @click="fileInput?.click()"
      >
        <input ref="fileInput" type="file" class="hidden" :accept="type === 'sound' ? 'audio/*' : 'image/*'" @change="onFileSelect" />
        <Icon v-if="!file" name="photo" class="w-10 h-10 text-white/20 mx-auto mb-3" />
        <template v-if="file">
          <p class="text-sm text-white/80 font-medium truncate">{{ file.name }}</p>
          <p class="text-xs text-white/30 mt-1">{{ (file.size / 1024).toFixed(1) }} KB</p>
        </template>
        <template v-else>
          <p class="text-sm text-white/40">点击或拖拽文件到此处</p>
          <p class="text-xs text-white/20 mt-1">{{ type === 'sound' ? '支持 wav, mp3, ogg 等' : '支持 jpg, png, webp 等' }}</p>
        </template>
      </div>

      <!-- Category -->
      <div class="mb-6">
        <label class="text-xs text-white/40 font-semibold mb-2 block">分类</label>
        <select v-model="category" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-[#e94560]/50 transition-colors appearance-none">
          <option value="" disabled class="bg-[#1a1a24]">请选择分类</option>
          <option v-for="c in categories" :key="c.name" :value="c.name" class="bg-[#1a1a24]">{{ c.name.replace(/^\d+-/, '') }} ({{ c.count }})</option>
        </select>
      </div>

      <!-- Title -->
      <div class="mb-8">
        <label class="text-xs text-white/40 font-semibold mb-2 block">标题（选填）</label>
        <input
          v-model="title"
          type="text"
          :placeholder="file ? file.name.replace(/\.[^.]+$/, '') : '自动取文件名'"
          class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/15 focus:border-[#e94560]/50 transition-colors"
        />
      </div>

      <!-- Upload -->
      <button
        :disabled="!file || !category || state === 'uploading'"
        class="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        :class="state === 'done' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-[#e94560] text-white hover:scale-[1.02]'"
        @click="state === 'done' ? reset() : upload()"
      >
        <template v-if="state === 'idle'">上传到 GitHub</template>
        <template v-else-if="state === 'uploading'">
          <span class="inline-flex items-center gap-2">
            <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            上传中...
          </span>
        </template>
        <template v-else-if="state === 'done'">{{ resultUrl ? '已上传，再来一个' : '上传成功' }}</template>
        <template v-else>上传失败，重试</template>
      </button>

      <p v-if="state === 'error'" class="text-xs text-red-400 mt-3">{{ errorMsg }}</p>

      <div v-if="state === 'done' && resultUrl" class="mt-4 p-4 rounded-xl bg-white/5 border border-white/5">
        <p class="text-xs text-white/40 mb-2">文件已推送到 GitHub 并写入数据库</p>
        <a :href="resultUrl" target="_blank" class="text-xs text-[#e94560] hover:underline break-all">{{ resultUrl }}</a>
      </div>
    </div>

    <AppFooter />
  </main>
</template>

<script setup lang="ts">
const fileInput = ref<HTMLInputElement>()
const file = ref<File | null>(null)
const dragOver = ref(false)
const type = ref<'sound' | 'wallpaper'>('sound')
const category = ref('')
const title = ref('')
const state = ref<'idle' | 'uploading' | 'done' | 'error'>('idle')
const errorMsg = ref('')
const resultUrl = ref('')
const categories = ref<{ name: string; count: number }[]>([])

async function loadCategories() {
  try {
    const url = type.value === 'sound' ? '/api/categories' : '/api/wallpapers/categories'
    const data = await $fetch<any>(url)
    categories.value = type.value === 'sound' ? data : data.filter((c: any) => c.name !== '全部')
  } catch { categories.value = [] }
}

function switchType(t: 'sound' | 'wallpaper') {
  if (type.value === t) return
  type.value = t
  file.value = null
  if (fileInput.value) fileInput.value.value = ''
  category.value = ''
  title.value = ''
  state.value = 'idle'
  resultUrl.value = ''
  loadCategories()
}

function onDrop(e: DragEvent) {
  dragOver.value = false
  const f = e.dataTransfer?.files?.[0]
  if (f) file.value = f
}

function onFileSelect(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (f) file.value = f
}

async function upload() {
  if (!file.value || !category.value) return
  state.value = 'uploading'
  errorMsg.value = ''
  try {
    const form = new FormData()
    form.append('file', file.value)
    form.append('category', category.value)
    form.append('type', type.value)
    if (title.value.trim()) form.append('title', title.value.trim())

    const res = await $fetch<any>('/api/upload', { method: 'POST', body: form })
    resultUrl.value = res.url || ''
    state.value = 'done'
  } catch (e: any) {
    state.value = 'error'
    errorMsg.value = e?.data?.message || e?.message || '上传失败'
  }
}

function reset() {
  file.value = null
  title.value = ''
  state.value = 'idle'
  resultUrl.value = ''
}

useSeoMeta({ title: '上传资源 - 锁车音效', description: '上传音效和壁纸' })

onMounted(() => loadCategories())
</script>
