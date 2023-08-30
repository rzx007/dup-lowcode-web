import { defineComponent } from 'vue'
import { redoIcon, undoIcon } from '@/icons'
export const UndoRedoButtons = defineComponent({
  name: 'UndoRedoButtons',
  setup(_props) {
    const iconStyle = {
      fontSize: '18px',
      cursor: 'pointer',
    }
    return () => (
      <el-space>
        <el-tooltip effect='dark' content='撤销' placement='top-start'>
          <i style={iconStyle}>{undoIcon}</i>
        </el-tooltip>
        <el-tooltip effect='dark' content='重做' placement='top-start'>
          <i style={iconStyle}>{redoIcon}</i>
        </el-tooltip>
      </el-space>
    )
  },
})
