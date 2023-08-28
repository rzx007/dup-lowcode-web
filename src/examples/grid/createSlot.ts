import { defineComponent, h, ref } from 'vue'
//高阶组件渲染slot虚拟节点 绑定ref
export default (slots: any) => {
  return defineComponent({
    setup(props, context) {
      const slotRef = ref(null)
      const [defaultSlot] = slots.default()
      // expose ref
      context.expose({
        slotRef,
      })
      return () => h(defaultSlot, { ref: slotRef })
    },
  })
}
// https://www.zhihu.com/question/520024036
