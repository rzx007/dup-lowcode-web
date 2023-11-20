import { createApp } from 'vue'
import { App } from './App'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './style.css'
import DndUi from '@/core/components'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(DndUi, { size: 1 })
app.mount('#app')

// 沙盒运行代码字符串
import { isExpression, parseJsStrToLte } from './utils/expression'
import { browserRuntimeVM } from '@/core/JsRuntime'

import { useDynamicHeadInsertion } from './hooks/useDynamicHeadInsertion'

const elements = useDynamicHeadInsertion([
  { tag: 'script', url: 'https://unpkg.com/dayjs@1.11.9/dayjs.min.js' }
])!
console.log(elements)

document.head.appendChild(elements)

const value = '执行的代码: {{size}}, {{dayjs().format("YYYY-MM-DD")}}'
const props = {
  size: 'small',
  title: '{{size}}'
}

if (value && typeof value === 'string' && isExpression(value)) {
  console.log(`执行代码： ${value}`)
  console.log(parseJsStrToLte(value))
  setTimeout(() => {
    console.log(browserRuntimeVM.execute(parseJsStrToLte(value), { ...props, ...window }))
  }, 1000)
}
