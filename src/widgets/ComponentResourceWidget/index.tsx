import { PropType, computed, defineComponent } from 'vue'
import './style.scss'
import { DrageShell } from '@/core/shells/DrageShell'
import { DndTypes } from '@/core/interfaces/dndTypes'
import { IComponentMaterial } from '@/core/interfaces/component'
import { clone } from 'xe-utils'
export interface DropResult {
  nodeSchema: any
  dragType: string
}
export const ComponentResourceWidget = defineComponent({
  props: {
    meterial: { type: Object as PropType<IComponentMaterial>, required: true },
    accept: { type: String, default: DndTypes.SHELL },
  },
  setup(props) {
    const color: string = props.meterial?.resource?.color || '#409EFF'
    const meterial = computed(() => {
      const obj = clone(props.meterial, true)
      delete obj['resource']
      return obj
    })
    const colorStyle = {
      color,
    }
    return () => (
      <el-col span={8}>
        <DrageShell accept={props.accept} meterial={meterial.value}>
          <div class='resource-widget'>
            <div class='resource-icon' style={colorStyle}>
              {props.meterial?.resource?.icon}
            </div>
            <div class='resource-text'>{props.meterial?.resource?.name}</div>
          </div>
        </DrageShell>
      </el-col>
    )
  },
})
