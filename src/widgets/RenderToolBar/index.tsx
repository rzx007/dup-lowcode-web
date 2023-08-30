import { defineComponent } from 'vue'
import { CanvasToolbar } from '@/layouts/CanvasToolbar'
import { UndoRedoButtons } from '../UndoRedoButtons'
import { AuxButtions } from '../AuxButtions'
import { ViewButton } from '../ViewButton'
export const RenderToolBar = defineComponent({
  name: 'RenderToolBar',
  setup(_props) {
    return () => (
      <CanvasToolbar>
        {{
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
        }}
      </CanvasToolbar>
    )
  },
})
