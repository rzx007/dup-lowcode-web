<template>
  <div :ref="drop" class="slot-placehodler">将组件拖拽到这里{{ canDrop }}{{ isOver }}</div>
</template>
<script setup lang="ts">
import { useDrop } from 'vue3-dnd'
import { inject, ref } from 'vue'
import { toRefs } from '@vueuse/core'
import { DndTypes, IDragItems } from '@/core/interfaces/dndTypes'
import { ITreeSchema } from '@/core/interfaces/component'

interface DragItem {
  source?: string
  schema: any
}

const props = defineProps<{
  parentId?: string | undefined
  slotName?: string | undefined
  itemSchema: ITreeSchema
}>()

const { insertSlotItems } = inject<any>('grid-provide')
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
      dropItem.id !== dragItem.id && insertSlotItems(dropItem, dragItem, props.slotName!)
    }
  },
  hover: (item: any, monitor) => {
    console.log('hover slot')
  },
  collect: (monitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
}))
const { canDrop, isOver } = toRefs(collect)
</script>
<style lang="scss">
.slot-placehodler {
  border: 1px dashed #999;
  background-color: #ccc;
  height: 34px;
}
</style>
