import { ElButton } from 'element-plus'
import { h, defineComponent, useAttrs } from 'vue'

export const ZthButton = defineComponent({
  name: 'ZthButton',
  props: {
    title: { type: String, default: '按钮' },
  },
  setup(props, _context) {
    const attr = useAttrs()
    return () =>
      h(
        ElButton,
        {
          ...attr,
          ...{
            // onClick: (value: any) => {
            //   console.log('ZthButton.ts ~ changeMyInput ~ value', value)
            // }
          },
        },
        {
          default: () => props.title,
        }
      )
  },
})
// {
//   "controller": {
//       "click": {
//           "actions": [
//               {
//                   "componentId": "u:8673d91cf9bc",
//                   "actionType": "hidden"
//               }
//           ]
//       }
//   }
// }
