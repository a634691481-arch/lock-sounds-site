<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-[9999] flex items-center justify-center p-4" @click.self="close">
        <div class="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        <div class="relative doppelrand shadow-tint w-full max-w-md">
          <div class="doppelrand-inner p-5 flex flex-col gap-4">
            <!-- Header -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Icon name="chat-bubble-left-ellipsis" class="w-5 h-5 text-[#e94560]" />
                <span class="font-bold text-slate-700">反馈与建议</span>
              </div>
              <button class="bg-transparent border-none text-slate-400 hover:text-[#e94560] cursor-pointer text-lg transition-colors" @click="close"><Icon name="x-mark" class="w-4 h-4" /></button>
            </div>

            <!-- Form -->
            <div class="flex flex-col gap-3">
              <div>
                <label class="text-xs text-slate-500 font-semibold mb-1 block">联系方式（选填）</label>
                <input
                  v-model="contact"
                  type="text"
                  placeholder="微信/QQ/邮箱，方便我们回复你"
                  class="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/50 outline-none text-sm text-slate-700 placeholder:text-slate-300 focus:border-[#e94560] transition-colors"
                />
              </div>
              <div>
                <label class="text-xs text-slate-500 font-semibold mb-1 block">反馈内容</label>
                <textarea
                  v-model="content"
                  rows="4"
                  placeholder="说说你的想法或遇到的问题..."
                  class="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/50 outline-none text-sm text-slate-700 placeholder:text-slate-300 focus:border-[#e94560] transition-colors resize-none"
                />
              </div>
              <button
                :disabled="sending || !content.trim()"
                class="w-full py-2.5 rounded-full font-semibold text-sm border-none cursor-pointer transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                :class="sending ? 'bg-slate-300 text-slate-500' : 'bg-[#e94560] text-white hover:bg-[#d63850]'"
                @click="submit"
              >
                {{ sending ? '发送中...' : '提交反馈' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const show = defineModel<boolean>()

const contact = ref('')
const content = ref('')
const sending = ref(false)
const toast = useToast()

function close() {
  show.value = false
}

async function submit() {
  if (!content.value.trim() || sending.value) return
  sending.value = true
  try {
    await $fetch('/api/feedback', {
      method: 'POST',
      body: { contact: contact.value, content: content.value },
    })
    toast.success('反馈已提交，感谢你的建议！')
    contact.value = ''
    content.value = ''
    close()
  } catch (e: any) {
    toast.error(e?.statusMessage || '提交失败，请稍后重试')
  }
  sending.value = false
}
</script>

<style>
.modal-enter-active { transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.modal-leave-active { transition: all 0.2s ease-in; }
.modal-enter-from { opacity: 0; }
.modal-enter-from > div:last-child { opacity: 0; transform: translateY(16px) scale(0.95); }
.modal-leave-to { opacity: 0; }
</style>
