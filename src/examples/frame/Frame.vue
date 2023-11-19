<script lang="ts">
import { createApp, ref, getCurrentInstance, h, onBeforeUpdate, defineComponent, App } from 'vue'

// eslint-disable-next-line vue/one-component-per-file
export default defineComponent({
  name: 'Framer',
  setup(_props, { slots }) {
    const iframeAppRef = ref<App>()
    const frame = ref()
    const vueInstance = getCurrentInstance()
    const renderChildren = (event: Event) => {
      const frameEl = vueInstance?.proxy?.$el || frame.value || event.target
      if (!frameEl) {
        return null
      }
      const win = frameEl.contentWindow
      const doc = frameEl.contentDocument
      const children = slots.default?.({ window: win })
      const body = doc.body
      const el = document.createElement('div')

      body.append(el)

      // eslint-disable-next-line vue/one-component-per-file
      const iframeApp = createApp({
        name: 'IframeApp',
        provide() {
          return {
            window: win,
            document: doc
          }
        },
        data() {
          return {
            children: children?.slice(0)
          }
        },
        render() {
          return h('div', this.children)
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

    return () => {
      return h('iframe', { onload: renderChildren, ref: frame })
    }
  }
})
</script>
