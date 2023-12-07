import { createSchema } from '@/core/shared/createSchema'

const options = {
  propsSchemas: [
    {
      componentName: 'el-input',
      'x-field': {
        name: 'columns',
        label: '表格列'
      },
      prop: {
        type: 'textarea'
      }
    },
    // {
    //   componentName: 'el-select',
    //   'x-field': {
    //     name: 'type',
    //     label: '类型',
    //     defaultValue: 'primary'
    //   },
    //   props: {
    //     childElement: 'el-option',
    //     options: [
    //       {
    //         value: 'primary',
    //         label: 'Primary'
    //       },
    //       {
    //         value: 'success',
    //         label: 'Success'
    //       },
    //       {
    //         value: 'warning',
    //         label: 'Warning'
    //       },
    //       {
    //         value: 'danger',
    //         label: 'Danger'
    //       },
    //       {
    //         value: 'info',
    //         label: 'Info'
    //       },
    //       {
    //         value: 'default',
    //         label: 'Default'
    //       }
    //     ]
    //   }
    // },
    {
      componentName: 'el-input',
      'x-field': {
        name: 'apiUrl',
        label: '请求地址'
      },
      prop: {
        type: 'textarea'
      }
    },
    {
      componentName: 'el-switch',
      'x-field': {
        name: 'requestAuto',
        label: '加载时自动请求',
        defaultValue: false
      }
    },
    {
      componentName: 'el-switch',
      'x-field': {
        name: 'pagination',
        label: '分页',
        defaultValue: true
      }
    },
    {
      componentName: 'el-switch',
      'x-field': {
        name: 'border',
        label: '表格边框',
        defaultValue: false
      }
    },
    {
      componentName: 'el-switch',
      'x-field': {
        name: 'stripe',
        label: '斑马纹',
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
  ],
  eventsSchemas: [
    {
      label: '点击',
      value: 'click'
    },
    {
      label: '鼠标移入',
      value: 'mounseenter'
    },
    {
      label: '鼠标移出',
      value: 'mounseleave'
    }
  ],
  styleSchemas: {}
}

export const buttonSchema = createSchema(options)
