import { CSSProperties, defineComponent } from 'vue'
import './style.scss'

export const CanvasToolbar = defineComponent({
  name: 'CanvasToolbar',
  props: {
    style: {
      type: Object as () => CSSProperties,
      default: () => ({})
    }
  },
  setup(props, { slots }) {
    return () => (
      <div class="zth-canvas-toolbar" style={props.style}>
        <div class="left">{slots.left?.()}</div>
        <div class="right">{slots.right?.()}</div>
      </div>
    )
  }
})
