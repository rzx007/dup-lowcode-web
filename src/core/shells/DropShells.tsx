import { PropType, defineComponent } from 'vue'
import { DropTargetMonitor, useDrop } from 'vue3-dnd'
import { DndTypes, IDragItems } from '@/core/interfaces/dndTypes'

export interface DropResult {
  nodeSchema: any
  dragType: string
}
export const DrageShell = defineComponent({
  name: 'DrageShell',
  props: {
    drop: { type: Function as PropType<(arg0: any, monitor: DropTargetMonitor) => any> },
    hover: { type: Function as PropType<(item: any, monitor: DropTargetMonitor) => void> },
    accept: { type: String, default: DndTypes.SHELL }
  },
  setup(props, { slots }) {
    const [, drop] = useDrop(() => ({
      accept: props.accept || DndTypes.SHELL,
      drop: (dragItem: IDragItems, monitor: DropTargetMonitor) => {
        return props.drop?.(dragItem, monitor)
      },
      hover: (item: any, monitor: DropTargetMonitor) => {
        props.hover?.(item, monitor)
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      })
    }))
    return () => <div ref={drop}>{slots.default?.()}</div>
  }
})
