import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { objectToString } from '@/utils/index'
export const useStateStore = defineStore('stateStore', () => {
  const pageCodeStr = ref<string>(`{
    disbaled: true,
    type: 'success',
    obj: {
      name: 'danger',
      color: 'red'
    },
    change: (str='small') => {
      return str
    },
    size: (a) => {
      obj.name = 'rex100'
      console.log('这是传递进来的参数:', a)
      console.log('按钮的初始type是:', type)
      console.log('这是嵌套对象调用:', obj)
      console.log('这是函数运行的结果:', change())
      console.log('从作用域插槽slotScope取值:', slotScope)
      console.log(document.querySelector('#app'))
      type = 'primary'
      disbaled = false
      return change()
    },
    sizeFn: (a) => {
      type = 'danger'
      return 'large'
    }
  }`)
  const testCode = ref(12)
  const updateCodeStr = () => {
    const codeStr = objectToString(pageCode.value)
    pageCodeStr.value = codeStr
  }
  const pageCode = computed(() => eval(`(${pageCodeStr.value})`))
  // 更新pageCode
  const updateCode = (scope: Record<string, any>) => {
    for (const key in pageCode.value) {
      if (pageCode.value[key] !== scope[key]) {
        pageCode.value[key] = scope[key]
      }
    }
    updateCodeStr()
  }
  return { pageCode, pageCodeStr, testCode, updateCode }
})
