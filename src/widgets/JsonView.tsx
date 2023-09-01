import { computed, defineComponent, ref } from 'vue'
import * as monaco from 'monaco-editor'
import monacoEditor from '@/components/monacoEditor/index.vue'
import { useDndActionStore } from '@/store/dnd-action'

export const JsonView = defineComponent({
  name: 'JsonView',
  components: { monacoEditor },
  setup(_props) {
    const dndStore = useDndActionStore()
    const code = computed({
      get: () => JSON.stringify(dndStore.data, null, 2),
      set: (codeStr: string) => {
        dndStore.data = JSON.parse(codeStr)
      },
    })
    const language = ref('json')
    const editorMounted = (editor: monaco.editor.IStandaloneCodeEditor) => {
      console.log('editor实例加载完成', editor)
    }
    return () => {
      return (
        <monacoEditor
          v-model={code.value}
          language={language.value}
          width='100%'
          height='100%'
          onEditorMounted={editorMounted}></monacoEditor>
      )
    }
  },
})
