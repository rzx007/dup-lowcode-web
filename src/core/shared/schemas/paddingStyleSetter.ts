export const paddingStyleSetter = {
  componentName: 'Fold',
  children: [
    {
      componentName: 'PaddingStyleSetter',
      'x-field': {
        type: 'fragment',
        fragmentFields: [
          {
            name: 'paddingTop',
          },
          {
            name: 'paddingRight',
          },
          {
            name: 'paddingBottom',
          },
          {
            name: 'paddingLeft',
          },
        ],
        params: {
          withBind: true,
        },
      },
      props: {
        title: '$padding',
        topTitle: '$paddingTop',
        rightTitle: '$paddingRight',
        leftTitle: '$paddingLeft',
        bottomTitle: '$paddingBottom',
      },
    },
  ],
}
