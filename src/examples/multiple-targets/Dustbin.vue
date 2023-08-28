<script lang="ts" setup>
import { CSSProperties, ref } from 'vue'
import { useDrop } from 'vue3-dnd'
import { computed, unref } from 'vue'
import { toRefs } from '@vueuse/core'

const style: CSSProperties = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}

// 获取drop的列表
const dropItems = ref<any>([])

const props = defineProps<{
  accept: string[]
  lastDroppedItem?: any
  // onDrop: (item: any) => void;
}>()

const emit = defineEmits(['drop'])

const [collect, drop] = useDrop({
  accept: props.accept,
  drop: (item: any) => {
    // props.onDrop(item);
    console.log(item)
    dropItems.value.push(item)
    emit('drop', item)
  },
  collect: (monitor: any) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
})

const { canDrop, isOver } = toRefs(collect)
const isActive = computed(() => unref(canDrop) && unref(isOver))
const backgroundColor = computed(() => (unref(isActive) ? 'darkgreen' : unref(canDrop) ? 'darkkhaki' : '#222'))
</script>

<template>
  <div :ref="drop" role="Dustbin" :style="{ ...style, backgroundColor }" data-testid="dustbin">
    {{ isActive ? 'Release to drop' : `This dustbin accepts: ${accept.join(', ')}` }}

    <p v-if="lastDroppedItem">Last dropped: {{ JSON.stringify(lastDroppedItem) }}</p>
    <template v-for="(item, index) in dropItems" :key="index">
      <component :is="item.ele" :item="item">{{ item.name }}</component>
    </template>
  </div>
</template>
