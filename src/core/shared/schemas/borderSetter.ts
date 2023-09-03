export const borderSetter = {
  componentName: 'Fold',
  children: [
    {
      componentName: 'BorderSetter',
      'x-field': {
        type: 'fragment',
        fragmentFields: [
          {
            name: 'borderTop',
          },
          {
            name: 'borderRight',
          },
          {
            name: 'borderBottom',
          },
          {
            name: 'borderLeft',
          },
        ],
        params: {
          withBind: true,
        },
      },
      props: {
        title: '$border',
      },
    },
  ],
}
