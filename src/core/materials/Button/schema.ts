import { createSchema } from "@/core/shared/createSchema"

const options = {
  propsSchemas: [
    {
      componentName: 'el-select',
      'x-field': {
        name: 'type',
        label: '类型',
        defaultValue: 'primary',
      },
      props: {
        childElement: 'el-option',
        options: [
          {
            value: 'primary',
            label: 'Primary',
          },
          {
            value: 'success',
            label: 'Success',
          },
          {
            value: 'warning',
            label: 'Warning',
          },
          {
            value: 'danger',
            label: 'Danger',
          },
          {
            value: 'info',
            label: 'Info',
          },
          {
            value: 'default',
            label: 'Default',
          },
        ],
      },
    },
    {
      componentName: 'el-switch',
      'x-field': {
        name: 'disabled',
        label: '禁用',
        defaultValue: false
      },
    },
    {
      componentName: 'el-switch',
      'x-field': {
        name: 'plain',
        label: '朴素按钮',
        defaultValue: false
      },
    },
    {
      componentName: 'el-switch',
      'x-field': {
        name: 'text',
        label: '文字按钮',
        defaultValue: false
      },
    },
    {
      componentName: 'el-switch',
      'x-field': {
        name: 'link',
        label: '链接按钮',
        defaultValue: false
      },
    },
    {
      componentName: 'el-switch',
      'x-field': {
        name: 'round',
        label: '圆角按钮',
        defaultValue: false
      },
    },
    {
      componentName: 'el-switch',
      'x-field': {
        name: 'circle',
        label: '圆形按钮',
        defaultValue: false
      },
    },
    {
      componentName: 'el-color-picker',
      'x-field': {
        name: 'color',
        label: '按钮颜色',
      },
    },
    {
      componentName: 'el-radio-group',
      'x-field': {
        name: 'size',
        label: '尺寸',
        defaultValue: 'default',
      },
      props: {
        optionType: 'button',
        size: 'small',
        childElement: 'el-radio-button',
        options: [
          {
            label: '大',
            value: 'large',
          },
          {
            label: '中',
            value: 'default',
          },
          {
            label: '小',
            value: 'small',
          },
        ],
      },
    },
  ],
  styleSchemas: {},
};

export const buttonSchema = createSchema(options)
