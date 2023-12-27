import { ITreeSchema } from '@/core/interfaces/component'
import { DndTypes } from '@/core/interfaces/dndTypes'
import { isEmpty } from 'lodash'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDndActionStore = defineStore('dndActionStore', () => {
  const data = ref<ITreeSchema[]>([]) // JSONschema
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
      if (!isEmpty(item.slots)) {
        for (const key in item.slots) {
          const slots = item.slots[key]
          if (key === slotName) {
            slots.push(dragItem)
          }
        }
      }
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
function findIndex(
  id: string,
  list: ITreeSchema[],
  callback: (list: ITreeSchema[], index: number) => void
) {
  if (!list) {
    return
  }
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (item.id === id) {
      callback(list, i)
      break
    } else if (!isEmpty(item.slots)) {
      for (const key in item.slots) {
        const slots = item.slots[key]
        findIndex(id, slots, callback)
      }
    }
  }
}
