import { IComponentMaterial } from '@/core/interfaces/component'
import { buttonSchema } from './schema'
import { buttonIcon } from './icon'
import { ZthButton } from '@/core/components/ZthButton'

const name = '按钮'
export const ButtonMaterial: IComponentMaterial = {
  componentName: ZthButton.name,
  compoentsTitle: name,
  designerSchema: buttonSchema,
  props: {
    // 初始化属性
    type: '{{type}}',
    // size: `{{size(change('large'))}}`,
    size: `{{size(disbaled)}}`,
    round: true,
    disabled: false
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
