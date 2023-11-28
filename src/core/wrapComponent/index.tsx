import { defineComponent, h, resolveComponent, useSlots, computed, watch, PropType } from 'vue'
import ErrorBoundary from './ErrorBoundary.vue'
import { ITreeSchema } from '@/core/interfaces/component'
export const WrapComponent = defineComponent({
  name: 'WrapComponent',
  props: {
    node: {
      type: Object as PropType<ITreeSchema>,
      required: true
    },
    componentName: {
      type: String,
      required: true
    }
  },
  setup(props, { attrs }) {
    const slots = useSlots()
    const slotArr = computed(() => {
      const slotArr: any = {}
      for (const key in slots) {
        if (slots[key]) {
          slotArr[key] = slots[key]?.()[0]
        }
      }
      return slotArr
    })
    watch(
      () => props.node,
      () => {
        console.log('node change')
      },
      { deep: true }
    )
    return () =>
      h(
        ErrorBoundary,
        null,
        h(
          resolveComponent(props.componentName),
          {
            ...attrs
          },
          // slotArr.value
          [slots.default?.(), slots.header?.()]
        )
      )
  }
})
