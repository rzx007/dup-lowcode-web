import { IComponentMaterial } from '@/core/interfaces/component'
import { inputSchema } from './schema'
import { inputIcon } from './icon'

const name = '输入框'
export const InputMaterial: IComponentMaterial = {
  componentName: 'el-input',
  compoentsTitle: name,
  designerSchema: inputSchema,
  props: {
    type: 'text',
    placeholder: '请输入内容',
    clearable: true,
  },
  style: {
    width: '200px',
  },
  resource: {
    name: name,
    icon: inputIcon,
    color: '#dfa324',
  },
}
