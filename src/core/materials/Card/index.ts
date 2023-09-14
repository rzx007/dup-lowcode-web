import { IComponentMaterial } from '@/core/interfaces/component'
import { cardSchema } from './schema'
import { icon } from './icon'

const name = '卡片'
export const CardMaterial: IComponentMaterial = {
  componentName: 'el-card',
  compoentsTitle: name,
  designerSchema: cardSchema,
  slots: [{ default: [] }, { header: [] }],
  props: {
    'body-style': '',
    shadow: 'hover'
  },
  resource: {
    name: name,
    icon: icon,
    color: '#dfa324'
  }
}
