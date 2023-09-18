import { ZthLayout } from './ZthLayout'
import { ZthButton } from './ZthButton'
import ZthTable from './ZthTable/index.vue'
import { App } from 'vue'
const components = [ZthLayout, ZthButton, ZthTable]
export default {
  install(app: App, options: any) {
    components.forEach(component => {
      app.component(component.name, component)
    })
  }
}
