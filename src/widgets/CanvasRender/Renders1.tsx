import { h, defineComponent, useAttrs, PropType } from 'vue'
import { Shell } from './Shell'
import WrapComponent from '@/core/wrapComponent/index.vue'
import { ITreeSchema } from '@/core/interfaces/component'
import { SlotPalcehodler } from './SlotPalcehodler'
import { useFieldsStore } from '@/store/fields-view'
import { toCss, capitalizeFirstLetter } from '@/utils'
import './style.scss'
import { isEmpty } from 'lodash'

export const Renders = defineComponent({
  name: 'Renders',
  inheritAttrs: true,
  props: {
    data: {
      type: Array as PropType<ITreeSchema[]>,
      default: () => []
    },
    slotScopeParams: { type: Object, required: false, default: () => ({}) },
    parentId: {
      type: String,
      default: ''
    }
  },
  setup(props, _context) {
    const attrs = useAttrs()
    const fieldStore = useFieldsStore()
    // 处理ITreeSchema的events属性
    const handleEvents = (item: ITreeSchema) => {
      const eventArr: { [x: string]: any } = {}
      const events = item.events
      if (events) {
        const keys = Object.keys(events)
        if (keys) {
          for (let index = 0; index < keys.length; index++) {
            const key = keys[index]
            const eventName = 'on' + capitalizeFirstLetter(key)
            const actions = events[key] as Array<any>
            const list = actions.map(action => action)
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
    // 遍历循环
    const reduceSlot = (item: ITreeSchema) => {
      const slots: { [key: string]: any } = {}
      if (isEmpty(item.slots)) {
        return
      }
      for (const key in item.slots) {
        const children = item.slots[key]
        children.length
          ? (slots[key] = (scopeParams: Record<string, any>) => {
              return (
                <Renders
                  data={children}
                  parentId={item.id}
                  key={item.id}
                  slotScopeParams={scopeParams}
                />
              )
            })
          : (slots[key] = () => (
              <SlotPalcehodler parentId={item.id} slotName={key} itemSchema={item} key={item.id} />
            ))
      }
      return slots
    }

    return () => (
      <>
        {props.data?.map(item => {
          const componentProps = {
            // ...item.props!,
            // ...handleEvents(item),
            ...attrs,
            style: toCss(item.style),
            key: item.id
          }
          return (
            item?.componentName &&
            h(
              Shell,
              { item, key: item.id, onClick: () => handleClick(item) },
              {
                default: () => {
                  if (!isEmpty(item.slots)) {
                    return (
                      <WrapComponent
                        componentName={item.componentName}
                        nodeProps={item.props!}
                        slotScopeParams={props.slotScopeParams}
                        {...componentProps}>
                        {reduceSlot(item)}
                      </WrapComponent>
                    )
                  }
                  return (
                    <WrapComponent
                      componentName={item.componentName}
                      slotScopeParams={props.slotScopeParams}
                      nodeProps={item.props!}
                      {...componentProps}></WrapComponent>
                  )
                }
              }
            )
          )
        })}
      </>
    )
  }
})
