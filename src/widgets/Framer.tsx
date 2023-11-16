import {
  createApp,
  ref,
  getCurrentInstance,
  h,
  onBeforeUpdate,
  defineComponent,
  App,
  onBeforeUnmount
} from 'vue'

// eslint-disable-next-line vue/one-component-per-file
export const Framer = defineComponent({
  name: 'Framer',
  setup(_props, { slots }) {
    const iframeAppRef = ref<App>()
    const frame = ref<HTMLIFrameElement | null>(null)
    // 获取当前组件实例
    const vueInstance = getCurrentInstance()
    const renderChildren = (event: Event) => {
      // 获取iframe标签
      const frameEl = vueInstance?.proxy?.$el || frame.value || event.target
      if (!frameEl) {
        return null
      }
      const win = frameEl.contentWindow
      const doc = frameEl.contentDocument
      // 默认插槽
      const children = slots.default?.({ window: win })
      const body = doc.body

      // 创建一个div标签挂载新vue实例
      const el = document.createElement('div')
      body.append(el)

      // 创建新实例
      // eslint-disable-next-line vue/one-component-per-file
      const iframeApp = createApp({
        name: 'IframeApp',
        provide() {
          return {
            window: win,
            document: doc
          }
        },
        render() {
          return children
        }
      })

      iframeApp.mount(el)

      iframeAppRef.value = iframeApp
    }

    onBeforeUpdate(() => {
      if (iframeAppRef.value) {
        const frameEl = vueInstance?.proxy?.$el || frame.value
        const win = frameEl.contentWindow
        ;(iframeAppRef.value as any).children = slots.default?.({ window: win })?.slice()
      }
    })
    onBeforeUnmount(() => {
      iframeAppRef.value && iframeAppRef.value.unmount()
    })

    return () => {
      return h('iframe', { onload: renderChildren, ref: frame })
    }
  }
})
