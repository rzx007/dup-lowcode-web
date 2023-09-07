import { PropType, defineComponent, ref } from 'vue'
import { ActionItem } from './controllerActions'
import './style.scss'

export type TeventType = {
  value: string;
  label: string
}
export const ControllerPanel = defineComponent({
  name: 'ControllerPanel',
  props: {
    data: {
      type: Array as PropType<TeventType[]>,
      default: () => []
    }
  },
  setup(props) {
    const eventTypes = ref<TeventType[]>([])
    const handleCommand = (eventItem: TeventType) => {
      const isEexit = eventTypes.value.filter((item) => item.label === eventItem.label).length
      !isEexit && eventTypes.value.push(eventItem)
    }
    const delEvent = (value: string | undefined) => {
      const index = eventTypes.value.findIndex((item) => item.value === value)
      index > -1 && eventTypes.value.splice(index, 1)
    }
    return () => (
      <>
        <div class='con-dropdown-wrap'>
          <el-dropdown onCommand={handleCommand} trigger="click">
            {{
              default: () => (
                <el-button type="primary" plain={true} style='width: 240px'>
                  添加事件
                </el-button>
              ),
              dropdown: () => (
                <el-dropdown-menu>
                  {props.data.map(({ label, value }) => {
                    return <el-dropdown-item command={{ label, value }}>{label}</el-dropdown-item>
                  })}
                </el-dropdown-menu>
              )
            }}
          </el-dropdown>
        </div>
        {
          eventTypes.value.map((item) => <ActionItem data={item} delEvent={delEvent} />)
        }
      </>
    )
  }
})