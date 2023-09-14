import { defineComponent, ref, toRefs, unref, PropType } from 'vue'
import './style.scss'
import { ButtonItem, NavItem } from './NavItem'

export type LeftNavProps = {
  activedKey?: string
  defaultActivedKey?: string
  items: ButtonItem[]
  onActive?: (activedKey: string) => void
}
export const LeftNav = defineComponent({
  name: 'LeftNav',
  props: {
    activedKey: { type: String },
    defaultActivedKey: { type: String },
    items: { type: Array as PropType<ButtonItem[]> },
    onActive: { type: Function }
  },
  setup(props) {
    const actived = ref(props.defaultActivedKey)
    const { items } = toRefs(props)
    console.log(actived.value)

    const handleSelect = (key: string) => {
      props.onActive?.(key)
      actived.value = key
    }
    return () => (
      <>
        {unref(items)?.map(item => {
          return (
            <NavItem
              actived={actived.value === item.key}
              key={item.key}
              item={item}
              onSelect={handleSelect}
            />
          )
        })}
      </>
    )
  }
})
