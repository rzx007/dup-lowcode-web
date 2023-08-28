<template>
  <div :ref="drag" role="Box" :style="{ ...style, opacity }" :data-testid="`box-${nodeSchema.componentName}`">
    {{ nodeSchema.componentName }}
  </div>
</template>

<script lang="ts" setup>
import clone from 'xe-utils/clone'
import { useDrag } from 'vue3-dnd'
import { ItemTypes } from './ItemTypes'
import { CSSProperties, computed, unref } from 'vue'
import { toRefs } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'

interface DropResult {
  nodeSchema: any
  dragType: string
}

const props = defineProps<DropResult>()

const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
}

const [collect, drag] = useDrag(() => ({
  type: props.dragType || ItemTypes.ITEM,
  item: () => ({
    source: 'tree',
    schema: { id: uuidv4(), ...clone(props.nodeSchema, true) },
  }),
  end: (item, monitor) => {
    const dropResult = monitor.getDropResult<DropResult>()
    if (item && dropResult) {
      console.log(dropResult)
      // alert(`You dropped ${item.name} into ${dropResult.name}!`)
    }
  },
  collect: (monitor) => ({
    isDragging: monitor.isDragging(),
    handlerId: monitor.getHandlerId(),
  }),
}))

const { isDragging } = toRefs(collect)

const opacity = computed(() => (unref(isDragging) ? 0.4 : 1))
</script>

<style lang="scss" scoped>
.box {
  float: left;
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid gray;
  cursor: move;

  &.dragging {
    opacity: 0.4;
  }
}
</style>
