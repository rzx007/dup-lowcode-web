import { PropType, defineComponent } from 'vue'
import { useDrop } from 'vue3-dnd'
import { toRefs } from '@vueuse/core'
import { DndTypes } from '@/core/interfaces/dndTypes'
import { ITreeSchema } from '@/core/interfaces/component'
import { useDndActionStore } from '@/store/dnd-action'

interface DragItem {
  source?: string
  schema: any
}
export const SlotPalcehodler = defineComponent({
  name: 'SlotPalcehodler',
  props: {
    parentId: {
      type: String
    },
    slotName: {
      type: String
    },
    itemSchema: {
      type: Object as PropType<ITreeSchema>
    }
  },
  setup(props) {
    const store = useDndActionStore()
    const { insertSlotItems } = store
    const [collect, drop] = useDrop(() => ({
      accept: DndTypes.SHELL,
      drop: (item: DragItem, monitor) => {
        const didDrop = monitor.didDrop()
        if (didDrop) {
          return
        }
        const dragItem = item.schema
        const dropItem = props.itemSchema
        // 被放置的组件
        console.log(dragItem, dropItem, item.source)
        if (item.source) {
          // 从组件树中拖拽
          insertSlotItems(dropItem, dragItem, props.slotName!, item.source)
        } else {
          // 在画布上移动
          dropItem!.id !== dragItem.id && insertSlotItems(dropItem, dragItem, props.slotName!)
        }
      },
      // hover: (item: any, monitor) => {
      //   console.log('hover slot')
      // },
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      })
    }))
    const { isOver } = toRefs(collect)

    return () => {
      return (
        <div ref={drop} class={['slot-placehodler', { 'slot-hover': isOver.value }]}>
          将组件拖拽到这里
        </div>
      )
    }
  }
})
