<template>
  <div :ref="drop" class="dustbin">
    <Renders :drop-items="dropItems"></Renders>
  </div>
  {{ JSON.stringify(dropItems, null, 2) }}
</template>
<script setup lang="ts">
import Renders from './Renders.vue'
import { useDrop } from 'vue3-dnd'
import { ItemTypes } from './ItemTypes'
import { ref, inject } from 'vue'

const emit = defineEmits(['drop'])
const { addItems, dropItems } = inject<any>('grid-provide')
const [collect, drop] = useDrop(() => ({
  accept: ItemTypes.ITEM,
  drop: (dragItem: { source?: string; schema: any }) => {
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
.dustbin {
  height: 100%;
  width: 100%;
  padding: 20px;
}
</style>
