import { defineComponent } from 'vue'
import { designIcon, jsonIcon, playIcon } from '@/icons'
export const ViewButton = defineComponent({
  name: 'ViewButton',
  setup(_props) {
    const iconStyle = {
      fontSize: '18px',
      cursor: 'pointer',
    }
    const activeStyle = {
      color: '#409EFF',
    }
    return () => (
      <el-space>
        <el-tooltip effect='dark' content='设计' placement='top-start'>
          <i style={{ ...iconStyle, ...activeStyle }}>{designIcon}</i>
        </el-tooltip>
        <el-tooltip effect='dark' content='JSON代码' placement='top-start'>
          <i style={iconStyle}>{jsonIcon}</i>
        </el-tooltip>
        <el-tooltip effect='dark' content='预览' placement='top-start'>
          <i style={iconStyle}>{playIcon}</i>
        </el-tooltip>
      </el-space>
    )
  },
})
