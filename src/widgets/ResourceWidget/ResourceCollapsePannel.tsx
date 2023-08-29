import { ArrowRight, ArrowDown } from '@element-plus/icons-vue'
import { CSSProperties, computed, defineComponent, ref } from 'vue'

export const ResourceCollapsePannel = defineComponent({
  name: 'ResourceCollapsePannel',
  props: {
    title: { type: String, required: true },
  },
  setup(props, { slots }) {
    const { title } = props
    const collapse = ref(true)
    const handleCollapseClick = () => {
      console.log('collapse')
      collapse.value = !collapse.value
    }
    const style = computed<CSSProperties>(() => {
      return {
        display: collapse.value ? 'block' : 'none',
      }
    })
    return () => (
      <div class='component-collapse'>
        <div class='title' onClick={handleCollapseClick}>
          <el-icon style='margin-right: 6px;'>{collapse.value ? <ArrowDown /> : <ArrowRight />}</el-icon>
          {title}
        </div>
        <div class='collapse-content' style={style.value}>
          <el-row gutter={0}>{slots.default?.()}</el-row>
        </div>
      </div>
    )
  },
})
