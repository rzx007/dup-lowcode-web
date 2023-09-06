import { PropType, defineComponent } from 'vue'
import { DnDShell } from '@/core/shells/DrageAndDropShell'
import { DndTypes, IDragItems } from '@/core/interfaces/dndTypes'
import { ITreeSchema } from '@/core/interfaces/component'
import { DropTargetMonitor } from 'vue3-dnd'
import { useOutlineStore } from '@/store/outline'
import { useDndActionStore } from '@/store/dnd-action'

export const Shell = defineComponent({
  name: 'Shell',
  props: {
    item: { type: Object as PropType<ITreeSchema>, required: true },
  },
  setup(props, { slots, attrs }) {
    const store = useOutlineStore()
    const dndStore = useDndActionStore()
    const { insertItems } = dndStore
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
      <DnDShell
        {...attrs}
        item={props.item}
        drop={dropHandle}
        accept={DndTypes.ITEM}
        outline={store.outline}
        paddingLine={store.paddingLine}>
        {slots.default?.()}
      </DnDShell>
    )
  },
})
