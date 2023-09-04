import { ZthLayout } from './ZthLayout'
import{ ZthButton } from './ZthButton'
import { App } from 'vue'
const components = [ZthLayout, ZthButton]
export default {
  install(app: App, options: any) {
    components.forEach(component => {
      app.component(component.name, component)
    })
  }
}
