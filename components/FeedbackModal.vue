<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-[9999] flex items-center justify-center p-4" @click.self="close" tabindex="-1">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-md" />
        <div class="relative w-full max-w-md rounded-2xl border border-white/10 shadow-2xl shadow-black/40" style="background: #14141c;">
          <div class="p-6 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <Icon name="chat-bubble-left-ellipsis" class="w-5 h-5 text-[#e94560]" />
                <span class="font-bold text-white text-base">反馈与建议</span>
              </div>
              <button class="bg-transparent border-none text-white/30 hover:text-white cursor-pointer transition-colors" @click="close"><Icon name="x-mark" class="w-4 h-4" /></button>
            </div>

            <div class="flex flex-col gap-3">
              <div>
                <label class="text-xs text-white/40 font-semibold mb-1.5 block">联系方式（选填）</label>
                <input
                  v-model="contact"
                  type="text"
                  placeholder="微信 / QQ / 邮箱"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 outline-none text-sm text-white placeholder:text-white/15 focus:border-[#e94560]/50 transition-colors"
                />
              </div>
              <div>
                <label class="text-xs text-white/40 font-semibold mb-1.5 block">反馈内容</label>
                <textarea
                  v-model="content"
                  rows="4"
                  placeholder="说说你的想法或遇到的问题..."
                  class="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 outline-none text-sm text-white placeholder:text-white/15 focus:border-[#e94560]/50 transition-colors resize-none"
                />
              </div>
              <button
                :disabled="sending || !content.trim()"
                class="w-full py-2.5 rounded-full font-semibold text-sm border-none cursor-pointer transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                :class="sending ? 'bg-white/10 text-white/30' : 'bg-[#e94560] text-white hover:bg-[#d63850]'"
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
