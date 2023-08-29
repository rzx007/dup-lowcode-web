export interface IResource {
  //唯一名称，防止重复注册
  name: string
  // elements: INodeSchema[] | INodeSchema,
  icon?: JSX.Element | string
  color?: string
  imageUrl?: string
}

export type IResizable = {
  width?: boolean
  height?: boolean
}

export type IMoveable = {
  x?: boolean
  y?: boolean
}

export interface IDesignerProps {
  style?: any
  [key: string]: any
}

export interface IComponentConfig<ComponentType = any> {
  packageName?: string //npm包名 生成代码用
  componentName: string
  // designerSchema?: INodeSchema
  designerProps?: IDesignerProps
  //designerParams?: IDesignerParams
  resource?: IResource
  //slots用到的组件，值为true时，用缺省组件DefaultSlot, string时，存的是已经注册过的component resource名字
  slots?: {
    [name: string]: IComponentConfig | true | string | undefined
  }
  tools?: {
    [name: string]: ComponentType | undefined
  }
}
