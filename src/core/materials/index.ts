import { IComponentMaterial } from '@/core/interfaces/component'
import { ButtonMaterial } from './Button'
import { InputMaterial } from './Input'
import { CardMaterial } from './Card'
import { LayoutMaterial } from './Layout'
export type MaterialGroup = {
  titleKey: string
  items: IComponentMaterial[]
}
export const materials: MaterialGroup[] = [
  {
    titleKey: '基础组件',
    items: [ButtonMaterial, InputMaterial, CardMaterial]
  },
  {
    titleKey: '表单组件',
    items: []
  },
  {
    titleKey: '布局控件',
    items: [LayoutMaterial]
  }
]
