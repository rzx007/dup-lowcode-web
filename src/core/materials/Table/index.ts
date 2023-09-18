import { IComponentMaterial } from '@/core/interfaces/component'
import { buttonSchema } from './schema'
import { buttonIcon } from './icon'

const name = '表格'
export const TableMaterial: IComponentMaterial = {
  componentName: 'ZthTable',
  compoentsTitle: name,
  designerSchema: buttonSchema,
  slots: [{ username: [] }],
  props: {
    // 初始化属性
    columns: [
      { type: 'selection', fixed: 'left', width: 80 },
      { type: 'index', label: '#', width: 80 },
      // { type: 'expand', label: 'Expand', width: 100 },
      { prop: 'base', label: '基本信息' },
      {
        prop: 'username',
        label: '用户姓名'
      }
    ],
    sizes: 'small',
    size: 'small'
  },
  controller: {
    click: [
      {
        componentId: '23432432',
        actionType: 'hidden'
      }
    ],
    mouseenter: [
      {
        componentId: '23432432',
        actionType: 'hidden'
      }
    ]
  },
  resource: {
    name: name,
    icon: buttonIcon,
    color: '#dfa324'
  }
}
