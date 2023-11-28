import { defineComponent } from 'vue'
export const DefaultFallback = defineComponent({
  name: 'DefaultFallback',
  setup(_props) {
    return () => (
      <div>
        <h1>发生错误!</h1>
        <p>请检查组件状态.</p>
      </div>
    )
  }
})
