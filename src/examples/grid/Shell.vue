<script lang="ts" setup>
import { computed, inject, onMounted, ref, unref } from 'vue'
import { useDrag, useDrop } from 'vue3-dnd'
import { ItemTypes } from './ItemTypes'
import { toRefs } from '@vueuse/core'
import { INode } from '@/types'

const props = defineProps<{
  id: string | undefined
  parentId?: string | undefined
  slotName?: string | undefined
  index: number
  itemSchema: INode
}>()

interface DragItem {
  source?: string
  schema: any
}

const { insertItems } = inject<any>('grid-provide')
const [dropCollect, drop] = useDrop<DragItem, void, { handlerId: any; isShallowOver: boolean }>({
  accept: ItemTypes.SHELL,
  collect(monitor) {
    return {
      handlerId: monitor.getHandlerId(),
      isShallowOver: monitor.isOver({ shallow: true })
    }
  },
  hover: (item: any, monitor) => {
    const { id: draggedId } = item
  },
  drop(item: DragItem, monitor) {
    const didDrop = monitor.didDrop()
    if (didDrop) {
      return
    }
    const dragItem = item.schema
    const dropItem = props.itemSchema
    // 被放置的组件
    console.log(dragItem, dropItem, item.source)
    insertItems(dropItem, dragItem, item.source)
  }
})

const [collect, drag] = useDrag({
  type: ItemTypes.SHELL,
  item: () => {
    return { source: '', schema: props.itemSchema }
  },
  end: (item, monitor) => {
    console.log('drag end', props.itemSchema)
    const dropResult = monitor.getDropResult()
    if (item && dropResult) {
      // console.log(dropResult)
      // alert(`You dropped ${item.name} into ${dropResult.name}!`)
    }
  },
  collect: (monitor: any) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem()
  })
})

const { handlerId, isShallowOver } = toRefs(dropCollect)
const { isDragging } = toRefs(collect)
const opacity = computed(() => (unref(isDragging) ? 0.2 : 1))

// 判断元素是行内元素还是块级元素
const isInlineElement = (el: HTMLElement) => {
  const display = window.getComputedStyle(el).display
  return display === 'inline' || display === 'inline-block' || display === 'inline-flex'
}
const slotRef = ref<Element | null>(null)
const setRef = (el: any) => {
  slotRef.value = el
  return drag(drop(el))
}
onMounted(() => {
  // 获取第一个子元素, 也就是组件的根元素
  const el = slotRef.value?.firstElementChild as HTMLElement
  // 根据isInlineElement设置父级的块级元素
  if (el && isInlineElement(el)) {
    const parent = el.parentElement as HTMLElement
    parent.style.display = 'inline-block'
  }
})

const clickHnadle = (e: MouseEvent) => {
  e.stopPropagation()
  e.preventDefault()
  console.log('clickHnadle', props.itemSchema)
}
</script>

<template>
  <div
    :ref="setRef"
    class="shell-container"
    :style="{ opacity }"
    :data-handler-id="handlerId"
    @click="clickHnadle"
  >
    <slot />
    <div v-if="isShallowOver && !isDragging" :class="['indicator']"></div>
  </div>
</template>

<style lang="scss" scoped>
.indicator {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #000;

  &.first {
    top: 0;
    bottom: unset;
  }
}

.shell-container {
  position: relative;
  background-color: white;
  // border: 1px dashed gray;
  cursor: move;
}
</style>
