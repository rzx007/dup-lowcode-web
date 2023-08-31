import { defineComponent } from 'vue'
import { redoIcon, undoIcon } from '@/icons'
export const UndoRedoButtons = defineComponent({
  name: 'UndoRedoButtons',
  setup(_props) {
    const iconStyle = {
      padding: '5px',
      fontSize: '16px',
    }
    return () => (
      <el-space>
        <el-tooltip effect='dark' content='撤销' placement='top-start'>
          <el-button style={iconStyle} disabled text size='small'>
            {undoIcon}
          </el-button>
        </el-tooltip>
        <el-tooltip effect='dark' content='重做' placement='top-start'>
          <el-button style={iconStyle} text size='small'>
            {redoIcon}
          </el-button>
        </el-tooltip>
      </el-space>
    )
  },
})
