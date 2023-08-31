import { defineStore } from 'pinia'
import { ref } from 'vue'

export enum DocumentType {
  DESIGN,
  JSON,
  PREVIEW,
}

export const useDocmentStore = defineStore('docmentStore', () => {
  // 辅助线
  const documentType = ref<DocumentType>(DocumentType.DESIGN)

  const changeDocumentType = (type: DocumentType) => {
    documentType.value = type
  }

  return { documentType, changeDocumentType }
})
