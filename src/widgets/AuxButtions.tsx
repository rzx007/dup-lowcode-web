import { defineComponent } from 'vue'
import { lineIcon, marginIcon } from '@/icons'
import { useOutlineStore } from '@/store/outline'

export const AuxButtions = defineComponent({
  name: 'AuxButtions',
  setup(_props) {
    const store = useOutlineStore()
    const iconStyle = {
      padding: '5px',
      fontSize: '16px',
      cursor: 'pointer',
    }
    const handleLine = () => {
      store.switchOutline()
    }
    const handleMargin = () => {
      store.switchPaddingLine()
    }
    return () => (
      <el-space>
        <el-tooltip effect='dark' content='辅助线' placement='top-start'>
          {/* <i style={iconStyle} onClick={handleLine}>{lineIcon}</i> */}
          <el-button
            style={iconStyle}
            text
            size='small'
            type={store.outline ? 'primary' : ''}
            bg={store.outline}
            onClick={handleLine}>
            {lineIcon}
          </el-button>
        </el-tooltip>
        <el-tooltip effect='dark' content='辅助边框' placement='top-start'>
          <el-button
            style={iconStyle}
            text
            size='small'
            type={store.paddingLine ? 'primary' : ''}
            bg={store.paddingLine}
            onClick={handleMargin}>
            {marginIcon}
          </el-button>
        </el-tooltip>
      </el-space>
    )
  },
})
