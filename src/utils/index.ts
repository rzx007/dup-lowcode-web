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

// 对象转换为css

export const toCss = (obj: any) => {
  if (!obj) {
    return ''
  }
  return Object.keys(obj)
    .map((key) => `${key}:${obj[key]}`)
    .join(';')
}

// 判断字符串是否是数字
export const isNumber = (value: string) => {
  return /^\d+$/.test(value)
}

export const parseJsStrToLte = (code: string): string => {

  // 匹配 {{}} 的内容
  const regex = /\{\{(.+?)\}\}/g;
  
  // {{}} -> ${}
  const result = code.replace(regex, '${$1}');

  // 转换成为模板字符串`${a1} ${a2}`格式
  
  return `\`${result}\``;
  
}

