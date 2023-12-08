import _ from 'lodash'
import { browserRuntimeVM } from '.'
import { watchDebounced } from '@vueuse/core'
import { isExpression, parseJsStrToLte } from '@/utils/expression'
import { Ref, computed, ref, unref, watch } from 'vue'
import { useStateStore } from '@/store/state-store'
import { storeToRefs } from 'pinia'

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
        const code = parseJsStrToLte(unref(conleProps)[key])
        const result = browserRuntimeVM.execute(code, {
          ...window,
          ...unref(pageCode),
          ...{ slotScope: unref(slotScope) || {} }
        })
        console.log('执行结果', result)
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
