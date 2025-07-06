import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilterStore = defineStore('filterStore', () => {

  const filterOpen = ref(false)

  const filterMenuOpen = () => {
    filterOpen.value = true
  }
  const closeFilterMenu = () => {
    filterOpen.value = false
  }
  return {
    filterOpen,
    filterMenuOpen,
    closeFilterMenu
  }
})