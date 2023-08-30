import { defineComponent } from 'vue'
import { lineIcon, marginIcon } from '@/icons'
export const AuxButtions = defineComponent({
  name: 'AuxButtions',
  setup(_props) {
    const iconStyle = {
      fontSize: '18px',
      cursor: 'pointer',
    }
    return () => (
      <el-space>
        <el-tooltip effect='dark' content='辅助线' placement='top-start'>
          <i style={iconStyle}>{lineIcon}</i>
        </el-tooltip>
        <el-tooltip effect='dark' content='辅助边框' placement='top-start'>
          <i style={iconStyle}>{marginIcon}</i>
        </el-tooltip>
      </el-space>
    )
  },
})
