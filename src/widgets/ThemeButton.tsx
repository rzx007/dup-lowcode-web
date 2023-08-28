import { defineComponent } from 'vue'
import { Switch } from 'vue-dark-switch'
export const ThemeButton = defineComponent({
  name: 'ThemeButton',
  setup() {
    return () => <Switch darkBackground='#fff' lightBackground='#2D2D2D' />
  },
})
