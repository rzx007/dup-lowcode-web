import { defineComponent } from 'vue'

export const SaveButton = defineComponent({
  name: 'SaveButton',
  setup(_props) {
    return () => (
      <el-button type='primary' size='small'>
        保存
      </el-button>
    )
  },
})
