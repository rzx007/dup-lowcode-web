import { PropType, defineComponent } from 'vue'
import './style.scss'
import { DrageShell } from '@/core/shells/DrageShell'
import { IComponentMaterial } from '@/core/interfaces/component'

export const ItemTypes = {
  ITEM: 'item',
  SHELL: 'shell',
}
export interface DropResult {
  nodeSchema: any
  dragType: string
}
export const ComponentResourceWidget = defineComponent({
  props: {
    meterial: { type: Object as PropType<IComponentMaterial>, required: true },
    dragType: { type: String, default: ItemTypes.ITEM },
  },
  setup(props) {
    const { meterial } = props
    const color: string = meterial?.resource?.color || '#409EFF'
    const colorStyle = {
      color,
    }
    return () => (
      <el-col span={8}>
        <DrageShell dragType={props.dragType} meterial={props.meterial}>
          <div class='resource-widget'>
            <div class='resource-icon' style={colorStyle}>{meterial?.resource?.icon}</div>
            <div class='resource-text'>{meterial?.resource?.name}</div>
          </div>
        </DrageShell>

      </el-col>
    )
  },
})
