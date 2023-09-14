import {
  defineComponent,
  computed,
  onMounted,
  ref,
  unref,
  PropType,
  CSSProperties,
  inject,
  watch
} from 'vue'
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'vue3-dnd'
import { toRefs } from '@vueuse/core'
import { DndTypes, IDragItems } from '@/core/interfaces/dndTypes'
import { ITreeSchema } from '@/core/interfaces/component'
import './style.scss'
import { DESIGER_PROVIDE } from '../Designer'
import { ActivedOutline } from '../auxwidgets/outlines/ActivedOutline'
import { SelectedOutline } from '../auxwidgets/outlines/SelectedOutline'

export const DnDShell = defineComponent({
  props: {
    item: { type: Object as PropType<ITreeSchema>, required: true },
    drop: {
      type: Function as PropType<(arg0: any, monitor: DropTargetMonitor) => any>,
      required: false
    },
    hover: {
      type: Function as PropType<(item: any, monitor: DropTargetMonitor) => void>,
      required: false
    },
    accept: { type: String, default: DndTypes.ITEM, required: false },
    outline: { type: Boolean, default: false, required: false },
    paddingLine: { type: Boolean, default: false, required: false }
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const [dropCollect, drop] = useDrop<
      IDragItems,
      void,
      { handlerId: any; isShallowOver: boolean }
    >({
      accept: DndTypes.SHELL,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
          isShallowOver: monitor.isOver({ shallow: true })
        }
      },
      hover: (item: any, monitor: DropTargetMonitor) => {
        props.hover?.(item, monitor)
      },
      drop(item: IDragItems, monitor: DropTargetMonitor) {
        return props.drop?.(item, monitor)
        // 被放置的组件
      }
    })

    const [dragCollect, drag] = useDrag({
      type: DndTypes.SHELL,
      item: () => {
        return { source: '', schema: props.item }
      },
      end: (item, monitor: DragSourceMonitor) => {
        const dropResult = monitor.getDropResult()
        if (item && dropResult) {
          // console.log(dropResult)
        }
      },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
        item: monitor.getItem()
      })
    })

    const { handlerId, isShallowOver } = toRefs(dropCollect)
    const { isDragging } = toRefs(dragCollect)
    const opacity = computed<CSSProperties>(() => ({ opacity: unref(isDragging) ? 0.2 : 1 }))

    // 判断元素是行内元素还是块级元素
    const isInlineElement = (el: HTMLElement) => {
      const display = window.getComputedStyle(el).display
      return display === 'inline' || display === 'inline-block' || display === 'inline-flex'
    }
    const slotRef = ref<Element | null>(null)
    const setRef = (el: any) => {
      slotRef.value = el
      return drag(drop(el))
    }
    onMounted(() => {
      // 获取第一个子元素, 也就是组件的根元素
      const el = slotRef.value?.firstElementChild as HTMLElement
      // 根据isInlineElement设置父级的块级元素
      if (el && isInlineElement(el)) {
        const parent = el.parentElement as HTMLElement
        parent.style.display = 'inline-block'
      }
    })

    const paddingLineClass = computed(() => {
      return props.paddingLine ? 'zth-shell-padding-line' : ''
    })

    const [activedOutline, selectedOutline] =
      inject<[ActivedOutline, SelectedOutline]>(DESIGER_PROVIDE)!
    const mounseoverHnadle = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      activedOutline!.handleActivedChange(handlerId.value)
    }
    // 点击选中
    const clickHandle = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      selectedOutline!.handleSelectChange(handlerId.value)
      emit('click', props.item)
    }
    // 拖拽时移除选中
    watch(isDragging, val => {
      if (val) {
        selectedOutline!.handleOutNode()
      }
    })
    return () => (
      <div
        ref={setRef}
        class={['shell-container', { 'zth-shell-outlined': props.outline }, paddingLineClass.value]}
        style={opacity.value}
        data-handler-id={handlerId.value}
        onMouseover={mounseoverHnadle}
        onMouseleave={activedOutline!.handleOutNode}
        onClick={clickHandle}
      >
        {slots.default?.()}
        {isShallowOver.value && !isDragging.value ? <div class="indicator"></div> : null}
      </div>
    )
  }
})
