import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOutlineStore = defineStore('outlineStore', () => {
  // 辅助线
  const outline = ref(false)
  function switchOutline() {
    outline.value = !outline.value
  }

  // 辅助边框
  const paddingLine = ref(false)
  function switchPaddingLine() {
    paddingLine.value = !paddingLine.value
  }

  return { outline, switchOutline, paddingLine, switchPaddingLine }
})
