import { IComponentMaterial } from '@/core/interfaces/component'
import { ButtonMaterial } from './Button'
import { InputMaterial } from './Input'
export type MaterialGroup = {
  titleKey: string
  items: IComponentMaterial[]
}
export const materials: MaterialGroup[] = [
  {
    titleKey: '基础组件',
    items: [ButtonMaterial, InputMaterial],
  },
  {
    titleKey: '表单组件',
    items: [],
  },
]
