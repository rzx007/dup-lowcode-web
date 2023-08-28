import { PropType, defineComponent, toRefs } from 'vue'

export type ButtonItem = {
  key: string
  title?: string
  icon: JSX.Element
}
export type NavButtonProps = {
  actived?: boolean
  item: ButtonItem
  onSelect?: (key: string) => void
}
export const NavItem = defineComponent({
  name: 'NavItem',
  props: {
    actived: { type: Boolean },
    item: { type: Object as PropType<ButtonItem> },
    onSelect: { type: Function },
  },
  setup(props) {
    const { actived = false, item, onSelect } = toRefs(props)
    const { icon, title, key } = item.value as ButtonItem
    return () => (
      <el-tooltip class='box-item' effect='dark' content={title} placement='right-start'>
        <div class={['zth-left-nav-item', actived ? 'nav-item-active' : '']} onClick={onSelect}>
          {icon}
        </div>
      </el-tooltip>
    )
  },
})
