import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStateStore = defineStore('stateStore', () => {
  const provide = ref(
    eval(`({
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
      console.log('这是传递进来的参数:', a)
      console.log('按钮的初始type是:', type)
      console.log('这是嵌套对象调用:', obj)
      console.log('这是函数运行的结果:', change())
      console.log('从作用域插槽slotScope取值:', slotScope)
      console.log(document.querySelector('#app'))
      return change()
    }
  })`)
  )

  return { provide }
})
