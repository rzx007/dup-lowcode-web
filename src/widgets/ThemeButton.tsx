import { defineComponent } from 'vue'
import { SwitchIcon } from 'vue-dark-switch'
export const ThemeButton = defineComponent({
  name: 'ThemeButton',
  setup() {
    return () => <SwitchIcon />
  }
})
