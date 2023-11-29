import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStateStore = defineStore('stateStore', () => {
  const provide = ref({
    disbaled: false,
    type: 'success',
    large: 'small'
  })

  return { provide }
})
