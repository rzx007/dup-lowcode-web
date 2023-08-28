import { CSSProperties, defineComponent } from 'vue'
import './style.scss'

export const CenterContent = defineComponent({
  name: 'CenterContent',
  props: {
    style: {
      type: Object as () => CSSProperties,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    return () => (
      <div class='zth-center-content' style={props.style}>
        {slots.default?.()}
      </div>
    )
  },
})
