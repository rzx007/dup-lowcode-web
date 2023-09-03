import { createSchema } from "@/core/shared/createSchema"

const options = {
  propsSchemas: [
    {
      componentName: 'el-select',
      'x-field': {
        name: 'type',
        label: '类型',
      },
      props: {
        childElement: 'el-option',
        options: [
          {
            value: 'primary',
            label: 'Primary',
          },
          {
            value: 'ghost',
            label: 'Ghost',
          },
          {
            value: 'dashed',
            label: 'Dashed',
          },
          {
            value: 'link',
            label: 'Link',
          },
          {
            value: 'text',
            label: 'Text',
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
        params: {
          valuePropName: 'checked',
        },
      },
    },
    {
      componentName: 'el-switch',
      'x-field': {
        name: 'block',
        label: '$block',
        params: {
          valuePropName: 'checked',
        },
      },
    },
    {
      componentName: 'el-switch',
      'x-field': {
        name: 'ghost',
        label: '$ghost',
        params: {
          valuePropName: 'checked',
        },
      },
    },
    {
      componentName: 'el-radio-group',
      'x-field': {
        name: 'shape',
        label: '形状',
      },
      props: {
        optionType: 'button',
        size: 'small',
        childElement: 'el-radio-button',
        options: [
          {
            label: '默认',
            value: 'default',
          },
          {
            label: '圆形',
            value: 'circle',
          },
          {
            label: '圆角',
            value: 'round',
          },
        ],
        defaultValue: 'default',
      },
    },
    {
      componentName: 'el-radio-group',
      'x-field': {
        name: 'size',
        label: '尺寸',
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
            value: 'middle',
          },
          {
            label: '小',
            value: 'small',
          },
        ],
        defaultValue: 'middle',
      },
    },
  ],
  styleSchemas: {},
};

export const buttonSchema = createSchema(options)
