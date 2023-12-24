import _ from 'lodash'
import { browserRuntimeVM } from '.'
import { isExpression, parseJsStrToLte } from '@/utils/expression'
import { Ref, computed, ref, unref, watch } from 'vue'
import { useStateStore } from '@/store/state-store'
import { storeToRefs } from 'pinia'
import { consola } from 'consola'

export const useParseBinding = (
  props: Ref<Record<string, any>>,
  slotScope: Ref<Record<string, any>>,
  _id?: string
) => {
  const stateStore = useStateStore()
  const { pageCode } = storeToRefs(stateStore)
  const { updateCode } = stateStore
  // 组件动态props运行的结果集
  const conleProps = ref<Record<string, any>>({})
  const execute = (props: Record<string, any>) => {
    conleProps.value = _.cloneDeep(props)
    // console.log(conleProps.value)
    // 循环props,判断值是表达式 的,
    for (const key in conleProps.value) {
      if (isExpression(unref(conleProps)[key])) {
        const [code, _] = parseJsStrToLte(unref(conleProps)[key])
        const result = browserRuntimeVM.execute(code, {
          ...window,
          ...unref(pageCode),
          ...{ slotScope: unref(slotScope) || {} }
        })
        consola.success('执行结果', result)
        if (result.success) {
          const value =
            result?.value === 'true' ? true : result?.value === 'false' ? false : result?.value
          // 更新组件的props值
          unref(conleProps)[key] = value
          // 更新pageCode
          updateCode(result.scope)
          console.log('新pageCode:', unref(pageCode))
        }
        console.log('--------------下一个执行分割线----------------')
      }
    }
  }
  const memoizedProps = computed(() => {
    return conleProps.value
  })
  // 监听nodeProps的变化
  watch(
    () => props.value,
    newVal => {
      console.log('组件的props变化了', newVal)
      /**
       * 缺少精细变化监控,
       * 执行两次execute,是因为先依赖的变量, 在后续其他的操作中改变值,没能正确更新导致执行结果不正确
       * 后续优化:
       */
      execute(newVal)
      execute(newVal)
    },
    { deep: true, immediate: true }
  )
  return { memoizedProps, execute }
}
