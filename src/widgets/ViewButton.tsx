import { defineComponent, ref } from 'vue'
import { designIcon, jsonIcon, playIcon, storeIcon } from '@/icons'
import { useDocmentStore, DocumentType } from '@/store/doument-view'
export const ViewButton = defineComponent({
  name: 'ViewButton',
  setup(_props) {
    const store = useDocmentStore()
    const type = ref(store.documentType)
    const changeDocumentType = (type1: DocumentType) => {
      store.changeDocumentType(type1)
      type.value = type1
    }
    const iconStyle = {
      padding: '5px',
      fontSize: '16px'
    }
    return () => (
      <el-space>
        <el-tooltip effect="dark" content="设计" placement="top-start">
          <el-button
            style={iconStyle}
            text
            size="small"
            type={type.value === DocumentType.DESIGN ? 'primary' : ''}
            bg={type.value === DocumentType.DESIGN}
            onClick={() => changeDocumentType(DocumentType.DESIGN)}>
            {designIcon}
          </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="JSON代码" placement="top-start">
          <el-button
            style={iconStyle}
            text
            size="small"
            type={type.value === DocumentType.JSON ? 'primary' : ''}
            bg={type.value === DocumentType.JSON}
            onClick={() => changeDocumentType(DocumentType.JSON)}>
            {jsonIcon}
          </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="状态" placement="top-start">
          <el-button
            style={iconStyle}
            text
            size="small"
            type={type.value === DocumentType.STORE ? 'primary' : ''}
            bg={type.value === DocumentType.STORE}
            onClick={() => changeDocumentType(DocumentType.STORE)}>
            {storeIcon}
          </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="预览" placement="top-start">
          <el-button
            style={iconStyle}
            text
            size="small"
            type={type.value === DocumentType.PREVIEW ? 'primary' : ''}
            bg={type.value === DocumentType.PREVIEW}
            onClick={() => changeDocumentType(DocumentType.PREVIEW)}>
            {playIcon}
          </el-button>
        </el-tooltip>
      </el-space>
    )
  }
})
