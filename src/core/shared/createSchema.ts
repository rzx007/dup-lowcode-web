// import { displaySetter, backgroundSetter, fontStyleSetter, martinStyleSetter, paddingStyleSetter, borderRediusSetter, borderSetter } from "./schemas";
export function createSchema(options: any = {}): any {
  const { propsSchemas, controllerSchemas } = options
  const propsTab = propsSchemas ? propsSchemas : []
  const controllerTab = controllerSchemas ? controllerSchemas : []
  return {
    propsTab,
    styleTab,
    controllerTab,
    dataTab: [],
  }
}

const styleTab = [
  {
    componentName: 'el-input',
    'x-field': {
      name: 'width',
      label: '宽度',
    },
    props: {
      type: 'text',
    },
  },
  {
    componentName: 'el-input',
    'x-field': {
      name: 'height',
      label: '高度',
    },
    props: {
      type: 'text',
    },
  },
]
