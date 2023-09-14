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

import { isExpression, parseJsStrToLte } from './utils/expression'
import { browserRuntimeVM } from '@/core/JsRuntime'
const value = '执行的代码: {{props.size}}'
const props = {
  size: 'small',
  title: '{{props.size}}'
}

if (value && typeof value === 'string' && isExpression(value)) {
  console.log(`执行代码： ${value}`)
  console.log(browserRuntimeVM.execute(parseJsStrToLte(value), { props }))
}
