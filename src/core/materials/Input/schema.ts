import { createSchema } from '@/core/shared/createSchema'

const options = {
  propsSchemas: [
    {
      componentName: 'el-input',
      'x-field': {
        name: 'modelValue',
        label: '绑定值'
      }
    },
    {
      componentName: 'el-select',
      'x-field': {
        name: 'type',
        label: '类型',
        defaultValue: 'text'
      },
      props: {
        childElement: 'el-option',
        options: [
          {
            value: 'text',
            label: '输入框'
          },
          {
            value: 'textarea',
            label: '文本框'
          },
          {
            value: 'file',
            label: '文件'
          },
          {
            value: 'number',
            label: '数字'
          },
          {
            value: 'password',
            label: '密码'
          }
        ]
      }
    },
    {
      componentName: 'el-input',
      'x-field': {
        name: 'placeholder',
        label: '占位符'
      }
    },
    {
      componentName: 'el-input',
      'x-field': {
        name: 'maxlength',
        label: '最大长度'
      },
      props: {
        type: 'number'
      }
    },
    {
      componentName: 'el-input',
      'x-field': {
        name: 'minlength',
        label: '最小长度'
      },
      props: {
        type: 'number'
      }
    },
    {
      componentName: 'el-switch',
      'x-field': {
        name: 'disabled',
        label: '禁用',
        defaultValue: false
      }
    },
    {
      componentName: 'el-switch',
      'x-field': {
        name: 'clearable',
        label: '可清除',
        defaultValue: false
      }
    },
    {
      componentName: 'el-radio-group',
      'x-field': {
        name: 'size',
        label: '尺寸',
        defaultValue: 'default'
      },
      props: {
        optionType: 'button',
        size: 'small',
        childElement: 'el-radio-button',
        options: [
          {
            label: '大',
            value: 'large'
          },
          {
            label: '中',
            value: 'default'
          },
          {
            label: '小',
            value: 'small'
          }
        ]
      }
    }
  ]
}

export const inputSchema = createSchema(options)
