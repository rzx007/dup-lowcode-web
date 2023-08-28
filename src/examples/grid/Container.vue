<template>
  <div class="grid-container">
    <div class="grid-left">
      <Element v-for="item in list" :key="item.componentName" :drag-type="dragType" :node-schema="item" />
      {{ list }}
    </div>
    <div class="grid-right">
      <Content />
    </div>
  </div>
</template>
<script setup lang="ts">
import { INodeSchema, INode } from '@/types'
import { ref, provide, computed } from 'vue'
import Element from './Element.vue'
import Content from './Content.vue'
import { ItemTypes } from './ItemTypes'

const dropItems = ref<any>([])
provide('grid-provide', {
  dropItems,
  addItems: (item: any) => {
    const itemSchema = { ...item }
    dropItems.value.push(itemSchema)
    return itemSchema
  },
  // 往空插槽添加dragItem
  insertSlotItems: (dropItem: any, dragItem: any, slotName: string, source?: string) => {
    if (!source) {
      // 从画布上拖拽, 先删除拖拽前的dragItem
      findIndex(dragItem.id, dropItems.value, (list, index) => {
        list.splice(index, 1)
      })
    }
    findIndex(dropItem.id, dropItems.value, (list, index) => {
      const item = list[index]
      item.slots = item.slots || [{ default: [] }]
      item.slots.forEach((slotItem) => {
        if (Object.keys(slotItem)[0] === slotName) {
          slotItem[slotName].push(dragItem)
        }
      })
    })
  },
  // 添加dragItem
  insertItems: (dropItem: any, dragItem: any, source?: string) => {
    if (!source) {
      findIndex(dragItem.id, dropItems.value, (list, index) => {
        list.splice(index, 1)
      })
    }
    findIndex(dropItem.id, dropItems.value, (list, index) => {
      list.splice(index + 1, 0, dragItem)
    })
  },
  // 删除dragItem
  deleteItems: (dragItem: any) => {
    findIndex(dragItem.id, dropItems.value, (list, index) => {
      list.splice(index, 1)
    })
  },
  // 复制dragItem
  copyItems: (dragItem: any) => {
    const itemSchema = { ...dragItem }
    dropItems.value.push(itemSchema)
    return itemSchema
  },
})

const dragType = computed(() => {
  return dropItems.value.length > 1 ? ItemTypes.SHELL : ItemTypes.ITEM
})

const list = ref<INodeSchema[]>([
  { componentName: 'el-button' },
  { componentName: 'el-tag' },
  { componentName: 'el-input' },
  {
    componentName: 'el-card',
    slots: [{ default: [] }, { header: [] }],
  },
])

// 根据id寻找节点
const findIndex = (id: string, list: INode[], callback: (list: INode[], index: number) => void) => {
  if (!list) {
    return
  }
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (item.id === id) {
      callback(list, i)
      break
    } else if (item.slots?.length) {
      item.slots.forEach((slotObj: { [key: string]: INode[] }) => {
        for (const [slotName, slots] of Object.entries(slotObj)) {
          findIndex(id, slots, callback)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.grid-container {
  height: calc(100vh - 90px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .grid-left {
    width: 260px;
    height: 100%;
    background-color: #f0f0f0;
  }

  .grid-right {
    flex: 1;
    height: 100%;
    background-color: #fff;
  }
}
</style>
