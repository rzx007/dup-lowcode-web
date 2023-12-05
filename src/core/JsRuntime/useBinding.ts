import _ from 'lodash'
import { browserRuntimeVM } from '.'
import { isExpression, parseJsStrToLte } from '@/utils/expression'
import { Ref, computed, ref, unref, watch } from 'vue'
import { useStateStore } from '@/store/state-store'
import { storeToRefs } from 'pinia'

export const useParseBinding = (props: Ref<Record<string, any>>, _id?: string) => {
  const stateStore = useStateStore()
  const { provide } = storeToRefs(stateStore)
  // 组件动态props运行的结果集
  const conleProps = ref<Record<string, any>>({})
  const execute = (props: Record<string, any>) => {
    conleProps.value = _.cloneDeep(props)
    console.log(conleProps.value)
    // 循环props,判断值是表达式 的,
    for (const key in conleProps.value) {
      if (isExpression(unref(conleProps)[key])) {
        const code = parseJsStrToLte(unref(conleProps)[key])
        const result = browserRuntimeVM.execute(code, { ...window, ...unref(provide) })
        console.log('执行结果', result)
        const value =
          result?.value === 'true' ? true : result?.value === 'false' ? false : result?.value
        unref(conleProps)[key] = value
      }
    }
  }
  execute(props.value)
  const memoizedProps = computed(() => {
    return conleProps.value
  })
  // 监听nodeProps的变化
  watch(
    () => props.value,
    newVal => {
      console.log('组件的props变化了')
      execute(newVal)
    },
    { deep: true }
  )
  return { memoizedProps, execute }
}
