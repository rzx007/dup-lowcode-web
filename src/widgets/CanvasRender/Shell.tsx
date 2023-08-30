import { PropType, defineComponent, inject } from 'vue'
import { DnDShell } from '@/core/shells/DrageAndDropShell'
import { DndTypes, IDragItems } from '@/core/interfaces/dndTypes'
import { ITreeSchema } from '@/core/interfaces/component'
import { DropTargetMonitor } from 'vue3-dnd'
export const Shell = defineComponent({
  name: 'Shell',
  props: {
    item: { type: Object as PropType<ITreeSchema>, required: true },
  },
  setup(props, { slots }) {
    const { insertItems } = inject<any>('grid-provide')
    const dropHandle = (item: IDragItems, monitor: DropTargetMonitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return
      }
      const dragItem = item.schema
      const dropItem = props.item
      // 被放置的组件
      console.log(dragItem, dropItem, item.source)
      insertItems(dropItem, dragItem, item.source)
    }
    return () => (
      <DnDShell item={props.item} drop={dropHandle} accept={DndTypes.ITEM}>
        {slots.default?.()}
      </DnDShell>
    )
  },
})
