import _ from 'lodash'
import { isExpression, parseJsStrToLte } from '@/utils/expression'
import { Ref, computed, ref, unref, watch } from 'vue'
import { useStateStore } from '@/store/state-store'
import { storeToRefs } from 'pinia'
import { consola } from 'consola'

export const useParseBinding = (
  props: Ref<Record<string, any>>,
  slotScopes: Ref<Record<string, any>>,
  _id?: string
) => {
  // @ts-ignore
  const slotScope = unref(slotScopes)
  const stateStore = useStateStore()
  const { pageCodeStr } = storeToRefs(stateStore)
  const pageCode = ref(eval(`(${pageCodeStr.value})`))
  // @ts-ignore
  const state = new Proxy(pageCode.value, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver)
    }
  })
  // consola.log('main type', eval('state.size(state.type)'))
  // 组件动态props运行的结果集
  const executeProps = ref<Record<string, any>>({})
  const execute = (props: Record<string, any>) => {
    const conleProps = _.cloneDeep(props)
    // consola.log(conleProps)
    for (const key in conleProps) {
      // 判断值是否表达式
      const propValue = conleProps[key]
      if (isExpression(propValue)) {
        const [_, codeRef] = parseJsStrToLte(propValue)
        setTimeout(() => {
          executeProps.value[key] = eval(codeRef)
        }, 0)
      } else {
        executeProps.value[key] = propValue
      }
    }
  }
  const memoizedProps = computed(() => {
    return executeProps.value
  })
  // 监听nodeProps的变化
  watch(
    () => props.value,
    newVal => {
      consola.info('组件的props变化了', newVal)
      /**
       * 缺少精细变化监控,
       * 执行两次execute,是因为先依赖的变量, 在后续其他的操作中改变值,没能正确更新导致执行结果不正确
       * 后续优化:
       */
      execute(newVal)
    },
    { deep: true, immediate: true }
  )
  watch(
    () => pageCode.value,
    newVal => {
      consola.success('pageCode变化了', newVal)
      execute(props.value)
    },
    { deep: true }
  )
  return { memoizedProps, execute }
}
