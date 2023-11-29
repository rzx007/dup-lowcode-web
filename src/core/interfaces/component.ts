import { Component, DefineComponent } from 'vue'

// 展示资源
export interface IResource {
  //唯一名称，防止重复注册
  name: string // 组件标题
  icon?: JSX.Element // 图标
  color?: string
}

export interface IComponentMaterial {
  componentName: string // 组件名称 用于注册
  compoentsTitle?: string // 组件标题
  designerSchema: any // 组件设计器配置
  resource?: IResource // 组件展示资源
  props?: Record<string, any>
  style?: Record<string, any>
  controller?: {
    [key: string]: unknown
  }
  data?: {
    [key: string]: unknown
  }
  slots?: { [key: string]: IComponentMaterial[] }[]
}

interface INodeSchema extends IComponentMaterial {
  id: string
  slots?: { [key: string]: INodeSchema[] }[]
}

export type ITreeSchema = Omit<INodeSchema, 'resource'>

// 根据id从ITreeSchema[]获取组件实例
// export function getComponentById(
//   id: string,
//   schema: ITreeSchema[]
// ): ITreeSchema | undefined {
//   let result: ITreeSchema | undefined
//   schema.some((item) => {
//     if (item.id === id) {
//       result = item
//       return true
//     }
//     if (item.slots) {
//       result = getComponentById(id, item.slots)
//       if (result) {
//         return true
//       }
//     }
//   })
//   return result
// }
