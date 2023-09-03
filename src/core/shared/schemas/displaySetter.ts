export const displaySetter = {
  componentName: 'Fold',
  children: [
    {
      componentName: 'DisplaySetter',
      'x-field': {
        type: 'fragment',
        fragmentFields: [
          {
            name: 'display',
          },
          {
            name: 'flexDirection',
          },
          {
            name: 'flexWrap',
          },
          {
            name: 'alignContent',
          },
          {
            name: 'justifyContent',
          },
          {
            name: 'alignItems',
          },
        ],
        params: {
          withBind: true,
        },
      },
      props: {
        title: '$display',
      },
    },
  ],
}
