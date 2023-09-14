import { defineComponent } from 'vue'

const style = {
  display: 'flex',
  width: '100%',
  flex: 1,
  height: 0
}
export const Workbench = defineComponent({
  name: 'Workbench',
  setup(_props, { slots }) {
    return () => <div style={style}>{slots.default?.()}</div>
  }
})
