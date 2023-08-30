import { defineComponent } from 'vue'
import { redoIcon, undoIcon } from '@/icons'
export const AuxButtions = defineComponent({
  name: 'AuxButtions',
  setup(_props) {
    return () => (
      <el-space>
        <el-tooltip effect='dark' content='撤销' placement='top-start'>
          {undoIcon}
        </el-tooltip>
        <el-tooltip effect='dark' content='重做' placement='top-start'>
          {redoIcon}
        </el-tooltip>
      </el-space>
    )
  },
})
