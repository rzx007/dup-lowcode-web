import { PropType, defineComponent, useAttrs } from 'vue'
import { capitalizeFirstLetter, isObject, toCss } from '@/utils'
import { ITreeSchema } from '@/core/interfaces/component'
import WrapComponent from '@/core/wrapComponent/index.vue'
import { isEmpty } from 'lodash'
export const PreviewRender = defineComponent({
  name: 'PreviewRender',
  props: {
    parentId: { type: String, required: false },
    slotScopeParams: { type: Object, required: false, default: () => ({}) },
    data: {
      type: Array as PropType<ITreeSchema[]>,
      required: true
    }
  },
  setup(props) {
    const attrs = useAttrs()
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
            eventArr[eventName] = () => {
              console.log(eventName, list)
            }
          }
        }
      }
      return eventArr
    }
    const reduceSlot = (item: ITreeSchema) => {
      const slots: { [key: string]: any } = {}
      if (isEmpty(item.slots)) {
        return
      }
      for (const key in item.slots) {
        const children = item.slots[key]
        slots[key] = (scopeParams: Record<string, any>) => {
          return (
            <PreviewRender
              data={children}
              parentId={item?.id}
              slotScopeParams={scopeParams}></PreviewRender>
          )
        }
      }
      return slots
    }
    return () => (
      <>
        {props.data.map(item => {
          const componentProps = {
            // ...item.props!,
            ...handleEvents(item),
            ...attrs,
            style: toCss(item.style),
            key: item.id
          }
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
          // return <component is={item.componentName} {...item.props} key={item.id}></component>
          return (
            <WrapComponent
              componentName={item.componentName}
              slotScopeParams={props.slotScopeParams}
              nodeProps={item.props!}
              {...componentProps}></WrapComponent>
          )
        })}
      </>
    )
  }
})
