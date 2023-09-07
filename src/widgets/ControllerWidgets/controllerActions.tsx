import { PropType, defineComponent, ref } from 'vue'
import { addIcon, delIcon, downIcon, upIcon, editIcon, del2Icon, dragIcon } from './icons'
import { TeventType } from '.'
export const ActionItem = defineComponent({
  name: 'ActionItem',
  props: {
    data: {
      type: Object as PropType<TeventType>
    },
    delEvent: {
      type: Function as PropType<(arg: string | undefined) => void>
    }
  },
  setup(props) {
    const open = ref(false)
    return () => (
      <div class='event-item'>
        <div class='event-item-header'>
          <div>{props.data?.label}</div>
          <div class='header-toolbar'>
            <span>{addIcon}</span>
            <span onClick={() => props?.delEvent?.(props.data?.value)}>{delIcon}</span>
            <span onClick={() => open.value = !open.value}>{open.value ? downIcon : upIcon}</span>
          </div>
        </div>
        {
          open.value && <ul class='item-content'>
            {[1, 2].map((item) => {
              return (
                <li class='action-item'>
                  <div class='action-header'>
                    <div class='header-left'>
                      <div>{dragIcon}</div>
                      <div>组件可见性</div>
                    </div>
                    <div class='header-right'>
                      <span>{editIcon}</span>
                      <span>{del2Icon}</span>
                    </div>
                  </div>
                  <div class='action-content'>
                    <div>隐藏文本框文本组件</div>
                  </div>
                </li>
              )
            })}
          </ul>
        }
      </div>
    )
  }
})