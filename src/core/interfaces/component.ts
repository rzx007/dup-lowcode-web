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
  resource: IResource // 组件展示资源
  props?: {
    [key: string]: unknown
  }
  slots?: { [key: string]: IComponentMaterial[] }[]
}

interface INodeSchema extends IComponentMaterial {
  id: string
  slots?: { [key: string]: INodeSchema[] }[]
}

export type ITreeSchema = Omit<INodeSchema, 'resource'>
