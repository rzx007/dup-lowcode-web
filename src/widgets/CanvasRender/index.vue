<template>
  <div :ref="drop" class="canvas-shell">
    <Renders :data="data"></Renders>
  </div>
</template>
<script setup lang="ts">
import Renders from './Renders.vue'
import { useDrop } from 'vue3-dnd'
import { DndTypes, IDragItems } from '@/core/interfaces/dndTypes'
import { inject } from 'vue'

const { addItems, data } = inject<any>('grid-provide')
const [, drop] = useDrop(() => ({
  accept: DndTypes.ITEM,
  drop: (dragItem: IDragItems) => {
    console.log(dragItem)
    const itemSchema = addItems(dragItem.schema)
    return itemSchema
  },
  collect: (monitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
}))
</script>
<style lang="scss">
.canvas-shell {
  width: 100%;
  flex: 1;
  transition: width 0.3s;
  box-sizing: border-box;
  padding: 0 16px;
  background-color: #eee;
}
</style>
