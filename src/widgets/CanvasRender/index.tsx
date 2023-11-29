import { Renders } from './Renders1'
import { useDrop } from 'vue3-dnd'
import { DndTypes, IDragItems } from '@/core/interfaces/dndTypes'
import { useDndActionStore } from '@/store/dnd-action'
import { storeToRefs } from 'pinia'
import { toRefs } from '@vueuse/core'
import { CSSProperties, defineComponent } from 'vue'
const style: CSSProperties = {
  width: '100%',
  flex: 1,
  transition: 'width 0.3s',
  boxSizing: 'border-box',
  overflow: 'auto'
}
export const CanvasRender = defineComponent({
  setup() {
    const store = useDndActionStore()
    const { addItems } = store
    const { data } = storeToRefs(store)
    const [collect, drop] = useDrop(() => ({
      accept: DndTypes.ITEM,
      drop: (dragItem: IDragItems) => {
        const itemSchema = addItems(dragItem.schema)
        return itemSchema
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      })
    }))
    const { isOver: _isOver, canDrop: _canDrop } = toRefs(collect)
    return () => (
      <div ref={drop} style={style}>
        <Renders data={data.value}></Renders>
      </div>
    )
  }
})
