import { PropType, defineComponent, toRefs } from 'vue'

export type ButtonItem = {
  key: string
  title?: string
  icon: JSX.Element
}
export const NavItem = defineComponent({
  name: 'NavItem',
  props: {
    actived: { type: Boolean },
    item: { type: Object as PropType<ButtonItem> },
    onSelect: { type: Function },
  },
  setup(props) {
    const { actived, item, onSelect } = toRefs(props)
    const { icon, title, key } = item.value as ButtonItem

    return () => (
      <el-tooltip class='box-item' effect='dark' content={title} placement='right-start'>
        <div class={['zth-left-nav-item', actived.value ? 'nav-item-active' : '']} onClick={() => onSelect.value!(key)}>
          {icon}
          {/* {actived.value} */}
        </div>
      </el-tooltip>
    )
  },
})
