import { PropType, defineComponent, useAttrs } from 'vue'
import { capitalizeFirstLetter, isObject, toCss } from '@/utils'
import { ITreeSchema } from '@/core/interfaces/component'
import WrapComponent from '@/core/wrapComponent/index.vue'
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
      item.slots!.forEach(ele => {
        const name = slotName(ele)
        const children = ele![name] as ITreeSchema[]
        slots[name] = (scopeParams: Record<string, any>) => {
          return (
            <PreviewRender
              data={children}
              parentId={item?.id}
              slotScopeParams={scopeParams}></PreviewRender>
          )
        }
      })
      return slots
    }
    return () => (
      <>
        {props.data.map(item => {
          const componentProps = {
            // ...item.props!,
            ...handleController(item),
            ...attrs,
            style: toCss(item.style),
            key: item.id
          }
          if (item.slots?.length) {
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
