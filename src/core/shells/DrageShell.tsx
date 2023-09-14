import { CSSProperties, PropType, computed, defineComponent, unref } from 'vue'
import { toRefs } from '@vueuse/core'
import { useDrag } from 'vue3-dnd'
import { clone } from 'xe-utils'
import { v4 as uuidv4 } from 'uuid'
import { DndTypes, IDragItems } from '@/core/interfaces/dndTypes'
import { IComponentMaterial, ITreeSchema } from '../interfaces/component'

export const DrageShell = defineComponent({
  name: 'DrageShell',
  props: {
    meterial: { type: Object as PropType<IComponentMaterial>, required: true },
    accept: { type: String, default: DndTypes.SHELL }
  },
  setup(props, { slots }) {
    const [collect, drag] = useDrag(() => ({
      type: props.accept || DndTypes.SHELL,
      item: () => ({
        source: 'tree',
        schema: { id: uuidv4(), ...clone(props.meterial, true) } as ITreeSchema
      }),
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<IDragItems | undefined>()
        if (item && dropResult) {
          console.log(dropResult)
        }
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId()
      })
    }))

    const { isDragging } = toRefs(collect)

    const opacity = computed<CSSProperties>(() => ({ opacity: unref(isDragging) ? 0.4 : 1 }))
    return () => (
      <div ref={drag} style={opacity.value}>
        {slots.default?.()}
      </div>
    )
  }
})
