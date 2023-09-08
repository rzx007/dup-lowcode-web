import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import './style.scss'
import { PropType, defineComponent, toRefs } from 'vue'

export enum ToggleType {
  left = 'left',
  right = 'right',
}

export const ToggleButton = defineComponent({
  name: 'ToggleButton',
  props: {
    toggleType: {
      type: String,
      default: ToggleType.left,
    },
    toggled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
      default: () => null,
    },
  },
  setup(props) {
    const { toggleType, toggled } = toRefs(props)
    const rightIcon = toggleType.value === ToggleType.left ? <ArrowRight /> : <ArrowLeft />
    const lefIcon = toggleType.value !== ToggleType.left ? <ArrowRight /> : <ArrowLeft />
    const typeClass = toggleType.value === ToggleType.left ? 'right-style' : 'left-style'
    return () => (
      <div class={['toggle-button', typeClass]} onClick={props.onClick}>
        <el-icon>{toggled.value ? rightIcon : lefIcon}</el-icon>
      </div>
    )
  },
})
