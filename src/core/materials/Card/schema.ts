import { createSchema } from '@/core/shared/createSchema'

const options = {
  propsSchemas: [
    {
      componentName: 'el-radio-group',
      'x-field': {
        name: 'shadow',
        label: '卡片阴影',
        defaultValue: 'never'
      },
      props: {
        optionType: 'button',
        size: 'small',
        childElement: 'el-radio-button',
        options: [
          {
            label: '总是',
            value: 'always'
          },
          {
            label: '绝不',
            value: 'never'
          },
          {
            label: '悬浮',
            value: 'hover'
          }
        ]
      }
    }
  ]
}

export const cardSchema = createSchema(options)
