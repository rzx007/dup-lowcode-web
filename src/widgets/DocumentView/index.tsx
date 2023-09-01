import { CSSProperties, computed, defineComponent } from 'vue'
import { Viewport } from './Viewport'
import CanvasRebder from '@/widgets/CanvasRender/index.vue'
import { JsonView } from '@/widgets/JsonView'
import { PreviewRender } from '../PreviewRender'
import { CanvasToolbar } from '@/layouts/CanvasToolbar'
import { UndoRedoButtons } from '../UndoRedoButtons'
import { AuxButtions } from '../AuxButtions'
import { ViewButton } from '../ViewButton'
import { useDocmentStore, DocumentType } from '@/store/doument-view'
import { useDndActionStore } from '@/store/dnd-action'

const style: CSSProperties = {
  width: '100%',
  flex: 1,
  transition: 'width 0.3s',
  boxSizing: 'border-box',
  backgroundColor: '#eee',
}
export const DocumentView = defineComponent({
  name: 'DocumentView',
  setup(_props) {
    const store = useDocmentStore()
    const dndStore = useDndActionStore()
    const slots = {
      left: () => (
        <>
          <UndoRedoButtons />
          <el-divider direction='vertical' />
          <AuxButtions />
        </>
      ),
      right: () => (
        <>
          <ViewButton />
        </>
      ),
    }
    return () => (
      <>
        <CanvasToolbar v-slots={slots}></CanvasToolbar>
        <Viewport>
          {store.documentType === DocumentType.DESIGN && <CanvasRebder />}
          {store.documentType === DocumentType.JSON && <JsonView />}
          {store.documentType === DocumentType.PREVIEW && (
            <div style={style}>
              <PreviewRender data={dndStore.data} />
            </div>
          )}
        </Viewport>
      </>
    )
  },
})
