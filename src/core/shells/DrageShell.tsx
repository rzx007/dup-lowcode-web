import { CSSProperties, PropType, computed, defineComponent, unref } from 'vue'
import { INodeSchema } from '@/types'
import { toRefs } from '@vueuse/core'
import { useDrag } from 'vue3-dnd'
import { clone } from 'xe-utils'
import { v4 as uuidv4 } from 'uuid'

export const ItemTypes = {
  ITEM: 'item',
  SHELL: 'shell',
}
export interface DropResult {
  nodeSchema: any
  dragType: string
}
export const DrageShell = defineComponent({
  name: 'DrageShell',
  props: {
    meterial: { type: Object as PropType<INodeSchema>, required: true },
    dragType: { type: String, default: ItemTypes.ITEM },
  },
  setup(props, { slots }) {
    const [collect, drag] = useDrag(() => ({
      type: props.dragType || ItemTypes.ITEM,
      item: () => ({
        source: 'tree',
        schema: { id: uuidv4(), ...clone(props.meterial, true) },
      }),
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>()
        if (item && dropResult) {
          console.log(dropResult)
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }))

    const { isDragging } = toRefs(collect)

    const opacity = computed<CSSProperties>(() => ({ opacity: unref(isDragging) ? 0.4 : 1 }))
    return () => (
      <div ref={drag} style={opacity.value}>
        {slots.default?.()}
      </div>
    )
  },
})
