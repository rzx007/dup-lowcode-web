import { IComponentMaterial } from '@/core/interfaces/component'
import { ZthLayout } from '../../components/ZthLayout'
import { layoutSchema } from './schema'
import { colIcon } from './icon'

const name = '两列布局'
export const LayoutMaterial: IComponentMaterial = {
  componentName: ZthLayout.name,
  compoentsTitle: name,
  designerSchema: layoutSchema,
  slots: [{ default: [] }, { header: [] }, { aside: [] }, { footer: [] }],
  props: {},
  style: {
    width: '100%',
    height: '100vh'
  },
  resource: {
    name: name,
    icon: colIcon,
    color: '#dfa324'
  }
}
