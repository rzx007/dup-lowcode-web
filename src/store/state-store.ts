import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStateStore = defineStore('stateStore', () => {
  const provide = ref(
    eval(`({
    disbaled: true,
    type: 'success',
    change: (str='small') => {
      return str
    },
    size: (a) => {
      console.log('这是传递进来的参数:', a)
      console.log('按钮的初始type是:', type)
      console.log('这是函数运行的结果:', change())
      console.log(document.querySelector('#app'))
      return change()
    }
  })`)
  )

  return { provide }
})
