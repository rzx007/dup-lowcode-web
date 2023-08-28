import { INode } from '@/types'

// 判断是对象还是字符串
export const isObject = (value: any) => {
  return Object.prototype.toString.call(value) === '[object Object]'
}

// 树形数据，根据id寻找父节点
// const findParent = (id: string, list: INode[]): INode | undefined => {
//   let parent: INode | undefined
//   const find = (id: string, list: INode[]) => {
//     for (let i = 0; i < list.length; i++) {
//       const item = list[i]
//       if (item.id === id) {
//         parent = item
//         break
//       } else if (item.slots?.length) {
//         find(id, item.slots)
//       }
//     }
//   }
//   find(id, list)
//   return parent
// }
