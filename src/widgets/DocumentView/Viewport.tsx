import { CSSProperties, defineComponent } from 'vue'

const viewportStyle: CSSProperties = {
  flex: 1,
  padding: '0px 16px',
  height: 0,
  width: '100%',
  display: 'flex',
  flexFlow: 'column',
  boxSizing: 'border-box',
}

export const Viewport = defineComponent({
  name: 'Viewport',
  setup(_props, { slots }) {
    return () => {
      return <div style={viewportStyle}>{slots.default!()}</div>
    }
  },
})
