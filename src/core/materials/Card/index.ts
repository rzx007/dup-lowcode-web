import { IComponentMaterial } from '@/core/interfaces/component'
import { icon } from './icon'

const name = '卡片'
export const CardMaterial: IComponentMaterial = {
  componentName: 'el-card',
  compoentsTitle: name,
  designerSchema: [],
  slots: [{ default: [] }, { header: [] }],
  props: {
    'body-style': '',
    shadow: 'none',
  },
  resource: {
    name: name,
    icon: icon,
    color: '#dfa324',
  },
}
