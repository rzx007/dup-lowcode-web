import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { objectToString } from '@/utils/index'
export const useStateStore = defineStore('stateStore', () => {
  const pageCodeStr = ref<string>(`{
      disbaled: true,
      type: 'success',
      obj: {
        name: 'danger',
        color: 'red'
      },
      change: function(str='small') {
        return str
      },
      size: function(a) {
        this.obj.name = 'rex100'
        console.log('这是传递进来的参数:', a)
        console.log('按钮的初始type是:', this.type)
        console.log('这是嵌套对象调用:', this.obj)
        console.log('这是函数运行的结果:', this.change())
        console.log('从作用域插槽slotScope取值:', slotScope)
        console.log(document.querySelector('#app'))
        this.type = 'primary'
        this.disbaled = false
        return this.change()
      },
      sizeFn: function() {
        this.type = 'danger'
        return 'large'
      },
      clickHandler: function(e) {
        console.info(e)
        console.info(this)
        console.info('这是按钮的type:',23132)
        alert('点击的位置：' + e.clientX + ',' + e.clientY)
      },
      dbClick: function(e) {
        console.log('dbClick', e)
        this.clickHandler(e)
      }
    }`)
  const updateCodeStr = () => {
    const codeStr = objectToString(pageCode.value)
    pageCodeStr.value = codeStr
  }
  const pageCode = ref(eval(`(${pageCodeStr.value})`))
  watch(pageCodeStr, () => {
    pageCode.value = eval(`(${pageCodeStr.value})`)
  })
  // 更新pageCode
  const updateCode = (scope: Record<string, any>) => {
    for (const key in pageCode.value) {
      if (pageCode.value[key] !== scope[key]) {
        pageCode.value[key] = scope[key]
      }
    }
    updateCodeStr()
  }
  return { pageCode, pageCodeStr, updateCode }
})
