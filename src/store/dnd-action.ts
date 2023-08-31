import { ITreeSchema } from '@/core/interfaces/component'
import { DndTypes } from '@/core/interfaces/dndTypes'
import { INode } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDndActionStore = defineStore('dndActionStore', () => {
  // 辅助线
  const data = ref<ITreeSchema[]>([])
  const addItems = (item: any) => {
    const itemSchema = { ...item }
    data.value.push(itemSchema)
    return itemSchema
  }
  // 往空插槽添加dragItem
  const insertSlotItems = (dropItem: any, dragItem: any, slotName: string, source?: string) => {
    if (!source) {
      // 从画布上拖拽, 先删除拖拽前的dragItem
      findIndex(dragItem.id, data.value, (list, index) => {
        list.splice(index, 1)
      })
    }
    findIndex(dropItem.id, data.value, (list, index) => {
      const item = list[index]
      item.slots = item.slots || [{ default: [] }]
      item.slots.forEach((slotItem) => {
        if (Object.keys(slotItem)[0] === slotName) {
          slotItem[slotName].push(dragItem)
        }
      })
    })
  }
  // 添加dragItem
  const insertItems = (dropItem: any, dragItem: any, source?: string) => {
    if (!source) {
      findIndex(dragItem.id, data.value, (list, index) => {
        list.splice(index, 1)
      })
    }
    findIndex(dropItem.id, data.value, (list, index) => {
      list.splice(index + 1, 0, dragItem)
    })
  }
  // 删除dragItem
  const deleteItems = (dragItem: any) => {
    findIndex(dragItem.id, data.value, (list, index) => {
      list.splice(index, 1)
    })
  }
  // 复制dragItem
  const copyItems = (dragItem: any) => {
    const itemSchema = { ...dragItem }
    data.value.push(itemSchema)
    return itemSchema
  }

  const dragType = computed(() => {
    return data.value.length > 0 ? DndTypes.SHELL : DndTypes.ITEM
  })

  return { data, dragType, addItems, insertSlotItems, insertItems, deleteItems, copyItems }
})

// 根据id寻找节点
function findIndex(id: string, list: INode[], callback: (list: INode[], index: number) => void) {
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
        for (const [, slots] of Object.entries(slotObj)) {
          findIndex(id, slots, callback)
        }
      })
    }
  }
}
