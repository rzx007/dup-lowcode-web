import { IComponentMaterial } from '@/core/interfaces/component'
import { buttonSchema } from './schema'
import { buttonIcon } from './icon'

const name = '按钮'
export const ButtonMaterial: IComponentMaterial = {
  componentName: 'el-button',
  compoentsTitle: name,
  designerSchema: [],
  props: {
    // 初始化属性
    type: 'primary',
    size: 'medium',
    round: true,
  },
  resource: {
    name: name,
    icon: buttonIcon,
    color: '#dfa324',
  },
}
