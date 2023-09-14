import { defineComponent } from 'vue'
import { Close } from '@element-plus/icons-vue'
export const ResourcesTitle = defineComponent({
  name: 'ResourcesTitle',
  props: {
    title: { type: String, default: '组件' }
  },
  setup(props, { slots }) {
    const { title } = props
    const handleCloseClick = () => {
      console.log('close')
    }
    return () => (
      <div class="rx-toggle-pane-title">
        <div>{title || ''}</div>
        {slots.default?.() || (
          <el-text onClick={handleCloseClick}>
            <el-icon size={18}>
              <Close />
            </el-icon>
          </el-text>
        )}
      </div>
    )
  }
})
