import { h, defineComponent, useAttrs, PropType, resolveComponent } from 'vue'
import { Shell } from './Shell'
import { ITreeSchema } from '@/core/interfaces/component'
import { SlotPalcehodler } from './SlotPalcehodler'
import { useFieldsStore } from '@/store/fields-view'
import { isObject, toCss, capitalizeFirstLetter } from '@/utils'
import './style.scss'

export const Renders = defineComponent({
  name: 'Renders',
  props: {
    data: {
      type: Array as PropType<ITreeSchema[]>,
      default: () => [],
    },
    parentId: {
      type: String,
      default: '',
    },
  },
  setup(props, _context) {
    const attrs = useAttrs()
    const fieldStore = useFieldsStore()
    const slotName = (slot: string | Object): string => {
      if (isObject(slot)) {
        return Object.keys(slot)[0] as string
      }
      return slot as string
    }
    // 处理ITreeSchema的controller属性
    const handleController = (item: ITreeSchema) => {
      const eventArr: { [x: string]: any } = {}
      const controller = item.controller
      if (controller) {
        const keys = Object.keys(controller)
        if (keys) {
          for (let index = 0; index < keys.length; index++) {
            const key = keys[index]
            const eventName = 'on' + capitalizeFirstLetter(key)
            const actions = controller[key] as Array<any>
            const list = actions.map((action) => action)
            eventArr[eventName] = (params?: any) => {
              console.log(eventName, list, params)
            }
          }
        }
      }
      return eventArr
    }
    // 点击组件
    const handleClick = (item: ITreeSchema) => {
      fieldStore.setCurNode(item)
    }
    const reduceSlot = (item: ITreeSchema) => {
      const slots: { [key: string]: any } = {}
      item.slots!.forEach((ele) => {
        const name = slotName(ele)
        const children = ele![name] as ITreeSchema[]
        children.length
          ? (slots[name] = () => <Renders data={children} parentId={item.id} key={item.id} />)
          : (slots[name] = () => <SlotPalcehodler parentId={item.id} slotName={name} itemSchema={item} key={item.id} />)
      })
      return slots
    }
    return () => (
      <>
        {props.data.map((item) => {
          return (
            item?.componentName &&
            h(
              Shell,
              { item, key: item.id, onClick: () => handleClick(item) },
              {
                default: () => {
                  if (item.slots?.length) {
                    return h(
                      //@ts-ignore
                      resolveComponent(item.componentName),
                      {
                        ...item.props!,
                        ...handleController(item),
                        ...attrs,
                        style: toCss(item.style),
                      },
                      reduceSlot(item)
                    )
                  }
                  return h(resolveComponent(item.componentName), {
                    ...item.props!,
                    ...handleController(item),
                    ...attrs,
                    style: toCss(item.style),
                  })
                },
              }
            )
          )
        })}
      </>
    )
  },
})
