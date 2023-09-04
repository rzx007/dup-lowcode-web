import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { isObject } from '@/utils'
import { materials } from '@/core/materials'
import { useDndActionStore } from '@/store/dnd-action'
import { ITreeSchema } from '@/core/interfaces/component'
type TFields = {
  props?: any
  style?: any
  [x: string]: any
}

export const useFieldsStore = defineStore('fieldsStore', () => {
  const currentNode = ref<ITreeSchema>()
  const currentDesignerSchema = ref<any>({})
  const fields = ref<TFields>({})

  // 当前组件的设计schema
  const setCurDesignerSchema = () => {
    materials.forEach((eles) => {
      if (eles.items) {
        eles.items.forEach((item) => {
          if (item.componentName === currentNode.value?.componentName) {
            currentDesignerSchema.value = item.designerSchema
          }
        })
      }
    })
  }
  const clearCurDesignerSchema = () => {
    currentDesignerSchema.value = []
  }
  watch(
    currentNode,
    (val, old) => {
      if (val?.componentName !== old?.componentName) {
        clearCurDesignerSchema()
        setCurDesignerSchema()
      }
    },
    { deep: true }
  )

  // 当前选中的组件
  const setCurNode = (node: ITreeSchema) => {
    currentNode.value = node
  }
  const clearCurNode = () => {
    currentNode.value = undefined
  }

  // 根据schema表单的值更新组件
  const updateComponent = () => {
    const dndStore = useDndActionStore()
    const findComponent = (data: ITreeSchema[]) => {
      for (let index = 0; index < data.length; index++) {
        const item = data[index]
        if (item.id === currentNode.value?.id) {
          data[index] = Object.assign({}, item, fields.value)
          break
        }
        if (item?.slots?.length) {
          item.slots.forEach((slotItem) => {
            const slots = slotName(slotItem)
            findComponent(slotItem[slots])
          })
        }
      }
    }
    findComponent(dndStore.data)
  }

  function slotName(slot: string | Object): string {
    if (isObject(slot)) {
      return Object.keys(slot)[0] as string
    }
    return slot as string
  }

  return { currentNode, fields, currentDesignerSchema, updateComponent, setCurNode, clearCurNode }
})
