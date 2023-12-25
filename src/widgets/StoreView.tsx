import { computed, defineComponent } from 'vue'
import * as monaco from 'monaco-editor'
import monacoEditor from '@/components/monacoEditor/index.vue'
import { isDark } from 'vue-dark-switch'
import { useStateStore } from '@/store/state-store'
import { storeToRefs } from 'pinia'

export const StoreView = defineComponent({
  name: 'StoreView',
  components: { monacoEditor },
  setup(_props) {
    const stateStore = useStateStore()
    const { pageCodeStr, pageCode } = storeToRefs(stateStore)
    const code = computed({
      get: () => {
        if (pageCodeStr.value) {
          return pageCodeStr.value.startsWith('const state =')
            ? pageCodeStr.value
            : 'const state = ' + pageCodeStr.value
        }
        return pageCodeStr.value
      },
      set: (codeStr: string) => {
        if (codeStr.startsWith('const state = ')) {
          pageCodeStr.value = codeStr.replace('const state = ', '')
        } else {
          pageCodeStr.value = codeStr
        }
        console.log(pageCode.value)
      }
    })
    const editorMounted = (editor: monaco.editor.IStandaloneCodeEditor) => {
      console.log('editor实例加载完成', editor)
    }
    return () => {
      return (
        <monacoEditor
          v-model={code.value}
          theme={isDark.value ? 'vs-dark' : 'vs'}
          width="100%"
          height="100%"
          onEditorMounted={editorMounted}></monacoEditor>
      )
    }
  }
})
