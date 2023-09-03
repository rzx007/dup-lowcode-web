import { PropType, defineComponent, h, resolveComponent } from 'vue'
import { isObject } from '@/utils'
import { ITreeSchema } from '@/core/interfaces/component'
export const PreviewRender = defineComponent({
  name: 'PreviewRender',
  props: {
    parentId: { type: String, required: false },
    data: {
      type: Array as PropType<ITreeSchema[]>,
      required: true,
    },
  },
  setup(props) {
    const slotName = (slot: string | Object): string => {
      if (isObject(slot)) {
        return Object.keys(slot)[0] as string
      }
      return slot as string
    }
    const reduceSlot = (item: ITreeSchema) => {
      const slots: { [key: string]: any } = {}
      item.slots!.forEach((ele) => {
        const name = slotName(ele)
        const children = ele![name] as ITreeSchema[]
        slots[name] = () => <PreviewRender data={children} parentId={item?.id}></PreviewRender>
      })
      return slots
    }
    return () => (
      <>
        {props.data.map((item) => {
          if (item.slots?.length) {
            return h(
              // @ts-ignore
              resolveComponent(item.componentName),
              { ...item.props },
              reduceSlot(item)
            )
          }
          // return <component is={item.componentName} {...item.props} key={item.id}></component>
          return h(resolveComponent(item.componentName), { ...item.props }, () => item.compoentsTitle)
        })}
      </>
    )
  },
})
