import { defineComponent } from 'vue'
import { Switch } from 'vue-dark-switch'
import { SwitchIcon } from 'vue-dark-switch'
export const ThemeButton = defineComponent({
  name: 'ThemeButton',
  setup() {
    return () => <SwitchIcon />
  },
})
