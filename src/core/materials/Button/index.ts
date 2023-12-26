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
    type: '{{state.type}}',
    // size: `{{size(change('large'))}}`,
    size: `{{state.size(state.disbaled)}}`,
    // color: `{{slotScope?.row?.color||''}}`,
    onClick: `{{ (e)=> state.clickHandler(e) }}`,
    // onMouseenter: `{{ state.dbClick.bind(state) }}`,
    round: true,
    disabled: false
  },
  events: {
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
