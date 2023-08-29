export interface INodeMeta {
  componentName: string
  compoentsTitle?: string
  icon?: JSX.Element
  props?: {
    [key: string]: unknown
  }
}

export interface INodeSchema extends INodeMeta {
  slots?: { [key: string]: INodeSchema[] }[]
}

export interface INode {
  id: string
  componentName: string
  props?: {
    [key: string]: unknown
  }
  slots?: { [key: string]: INode[] }[]
}
