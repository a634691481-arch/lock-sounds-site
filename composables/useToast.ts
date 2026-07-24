export type ToastType = 'success' | 'error' | 'info'

let _toasts: Ref<Array<{ id: number; message: string; type: ToastType }>> | null = null
let _nextId = 0

export function useToast() {
  const toasts = useState<Array<{ id: number; message: string; type: ToastType }>>('toasts', () => [])

  function show(message: string, type: ToastType = 'info', duration = 2500) {
    const id = ++_nextId
    toasts.value = [...toasts.value, { id, message, type }]
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration)
    }
  }

  function dismiss(id: number) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  const success = (msg: string) => show(msg, 'success')
  const error = (msg: string) => show(msg, 'error', 3500)
  const info = (msg: string) => show(msg, 'info')

  return { toasts, show, dismiss, success, error, info }
}
