import { IComponentMaterial } from '@/core/interfaces/component'
import { buttonSchema } from './schema'
import { inputIcon } from './icon'

const name = '输入框'
export const InputMaterial: IComponentMaterial = {
  componentName: 'el-input',
  compoentsTitle: name,
  designerSchema: {},
  props: {
    type: 'text',
    placeholder: '请输入内容',
    clearable: true,
  },
  resource: {
    name: name,
    icon: inputIcon,
    color: '#dfa324',
  },
}
