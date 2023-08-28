import { defineComponent } from 'vue'
import './style.scss'

export const ShellContainer = defineComponent({
  name: 'ShellContainer',
  setup(_props, { slots }) {
    return () => <div class='zth-shell-container'>{slots.default?.()}</div>
  },
})
