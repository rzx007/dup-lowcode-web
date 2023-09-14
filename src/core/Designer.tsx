import { defineComponent, provide } from 'vue'
import { ActivedOutline } from './auxwidgets/outlines/ActivedOutline'
import { SelectedOutline } from './auxwidgets/outlines/SelectedOutline'
export const DESIGER_PROVIDE = Symbol('DESIGER_PROVIDE')
export const Designer = defineComponent({
  name: 'Designer',
  setup(_props, { slots }) {
    provide<[ActivedOutline, SelectedOutline]>(DESIGER_PROVIDE, [
      new ActivedOutline(),
      new SelectedOutline()
    ])
    return () => <>{slots.default?.()}</>
  }
})
