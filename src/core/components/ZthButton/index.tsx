import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
export const ZthButton = defineComponent({
  name: 'ZthButton',
  props: {
    title: { type: String, default: '按钮' }
  },
  component: { ElButton },
  setup(props, { attrs }) {
    return () => {
      return <el-button {...attrs}>{props.title}</el-button>
    }
  }
})