<template>
  <div :ref="drop" class="canvas-shell">
    <Renders :data="data"></Renders>
  </div>
</template>
<script setup lang="ts">
import { Renders } from './Renders'
import { useDrop } from 'vue3-dnd'
import { DndTypes, IDragItems } from '@/core/interfaces/dndTypes'
import { useDndActionStore } from '@/store/dnd-action'
import { storeToRefs } from 'pinia'
import { toRefs } from '@vueuse/core'

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
</script>
<style lang="scss" scoped>
.canvas-shell {
  width: 100%;
  flex: 1;
  transition: width 0.3s;
  box-sizing: border-box;
  overflow: auto;
}
</style>
