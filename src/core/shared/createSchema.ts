// import { displaySetter, backgroundSetter, fontStyleSetter, martinStyleSetter, paddingStyleSetter, borderRediusSetter, borderSetter } from "./schemas";
export function createSchema(options: any = {}): any {
  const { propsSchemas, eventsSchemas } = options
  const propsTab = propsSchemas ? propsSchemas : []
  const eventsTab = eventsSchemas ? eventsSchemas : []
  return {
    propsTab,
    styleTab,
    eventsTab,
    dataTab: []
  }
}

const styleTab = [
  {
    componentName: 'el-input',
    'x-field': {
      name: 'width',
      label: '宽度'
    },
    props: {
      type: 'text'
    }
  },
  {
    componentName: 'el-input',
    'x-field': {
      name: 'height',
      label: '高度'
    },
    props: {
      type: 'text'
    }
  }
]
